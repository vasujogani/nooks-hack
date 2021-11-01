import { promisify } from "typed-promisify";

import OT, {
  Dimensions,
  Event,
  PublisherProperties,
  OTError,
  Session,
  Stream,
} from "@opentok/client";

import AgoraRTC from "agora-rtc-sdk-ng";

const APPID = "46908704";

OT.setLogLevel(3);

type joinOpenTokRoomParams = {
  sessionId: string;
};
export const initToOpenTokRoom = async (data: joinOpenTokRoomParams) => {
  const { sessionId } = data;
  try {
    const session = OT.initSession(APPID, sessionId);
    if (!session) {
      return null;
    }

    return session;
  } catch (err) {
    console.log("[ot] caught error joining room");
    console.log(err);
    return null;
  }
};

export const connectToOpenTokRoom = async (
  session: OT.Session,
  sessionToken: string
): Promise<boolean> => {
  try {
    const connectPromise = promisify(
      (
        sessionToken: string,
        callback: (err: OTError | null, result: void) => void
      ) =>
        session!.connect(sessionToken, async (error) => {
          callback(error ?? null, undefined as void);
        })
    );
    await connectPromise(sessionToken);
    return true;
  } catch (e) {
    return false;
  }
};

export type streamPropertyChangedParamType = Event<
  "streamPropertyChanged",
  Session
> & {
  stream: Stream;
} & (
    | { changedProperty: "hasAudio"; oldValue: boolean; newValue: boolean }
    | { changedProperty: "hasVideo"; oldValue: boolean; newValue: boolean }
    | {
        changedProperty: "videoDimensions";
        oldValue: Dimensions;
        newValue: Dimensions;
      }
  );

export const subscribeToUpdates = (
  session: OT.Session,
  listeners: {
    handleStreamCreated: (session: OT.Session, stream: OT.Stream) => void;
    handleStreamDestroyed: (stream: OT.Stream) => void;
    handleStreamPropertyChanged: (
      event: streamPropertyChangedParamType
    ) => void;
  }
) => {
  const {
    handleStreamCreated,
    handleStreamDestroyed,
    handleStreamPropertyChanged,
  } = listeners;
  console.log("subscribe to update....");
  session.on("streamCreated", async (event) => {
    console.log("[ot-ctrl] stream created: ", event);
    await handleStreamCreated(session, event.stream);
  });
  session.on("streamDestroyed", async (event) => {
    console.log("[ot-ctrl] stream destroyed: ", event);
    await handleStreamDestroyed(event.stream);
  });
  session.on("streamPropertyChanged", async (event) => {
    await handleStreamPropertyChanged(event);
  });
  session.on("sessionReconnecting", async (_) => {
    console.log("[ot-ctrl] session reconnecting");
  });
  session.on("sessionReconnected", async (_) => {
    console.log("[ot-ctrl] session reconnected");
  });
  session.on("exception", async (event) => {
    console.log("[ot-ctrl] exception: ", event);
  });
  session.on("sessionDisconnected", async (event) => {
    console.log("[ot-ctrl] session disconnected: ", event.reason);
  });
};

export const subscribe = async (
  session: OT.Session,
  stream: OT.Stream
): Promise<OT.Subscriber | null> => {
  return new Promise((resolve) => {
    const subscriber = session.subscribe(
      stream,
      undefined,
      {
        insertDefaultUI: false,
        style: { buttonDisplayMode: "on" },
        subscribeToAudio: true,
        subscribeToVideo: true,
      },
      async (error) => {
        console.log("error subscribing ");
        console.log(error);
        if (error) {
          resolve(null);
        } else {
          resolve(subscriber);
        }
      }
    );
  });
};

export const publish = async (
  session: OT.Session,
  state: {
    audioOn: boolean;
    videoOn: boolean;
  }
): Promise<OT.Publisher | null> => {
  const { audioOn, videoOn } = state;
  const { audioDevices, videoDevices } = await loadPossibleDevices();

  if (
    Object.keys(audioDevices).length === 0 ||
    Object.keys(videoDevices).length === 0
  ) {
    console.log("audio/video device not found");
    return null;
  }
  const audioDevice = Object.keys(audioDevices)[0];
  const videoDevice = Object.keys(videoDevices)[0];

  const publishProperties: PublisherProperties = {
    insertDefaultUI: false,
    resolution: "320x180",
    frameRate: 15,
    videoSource: videoDevice,
    audioSource: audioDevice,
    publishAudio: audioOn,
    publishVideo: videoOn,
  };

  const initPublisherPromise = promisify(
    (
      properties: PublisherProperties,
      callback: (err: OTError | null, result?: OT.Publisher) => void
    ) => {
      const publisher = OT.initPublisher(undefined, properties, (error) =>
        callback(error ?? null, !error ? publisher : undefined)
      );
    }
  );

  const publisher = (await initPublisherPromise(publishProperties)) ?? null;

  if (!publisher) {
    console.log("[ot] failed to create publisher");
    return null;
  }

  if (publisher && !audioOn) {
    publisher.publishAudio(false);
  }
  if (publisher && !videoOn) {
    publisher.publishVideo(false);
  }

  const publishPromise = promisify(
    (
      publisher: OT.Publisher,
      callback: (err: OTError | null, result?: OT.Publisher) => void
    ) => {
      const result: OT.Publisher | undefined = session.publish(
        publisher,
        (error) => callback(error ?? null, !error ? result : undefined)
      );
    }
  );

  await publishPromise(publisher);

  publisher.on("audioLevelUpdated", () => {});

  return publisher;
};

const loadPossibleDevices = async () => {
  const audioDevices: Record<string, MediaDeviceInfo> = {};
  const videoDevices: Record<string, MediaDeviceInfo> = {};

  try {
    let microphones: MediaDeviceInfo[] | undefined =
      await AgoraRTC.getMicrophones();

    microphones?.forEach((device: MediaDeviceInfo) => {
      if (device) {
        audioDevices[device.deviceId] = device;
      }
    });
    let cameras: MediaDeviceInfo[] | undefined = await AgoraRTC.getCameras();

    cameras?.forEach((device: MediaDeviceInfo) => {
      if (device) {
        videoDevices[device.deviceId] = device;
      }
    });
  } catch (error) {
    console.warn("[ot] error loading possible devices");
  }

  return { audioDevices, videoDevices };
};

export const setAudioState = async (
  data: {
    on: boolean;
    onComplete: () => void;
  },
  publisher: OT.Publisher
) => {
  const { on, onComplete } = data;
  console.log("setting audio to be ", on);
  publisher.publishAudio(on);
  onComplete();
};

export const setVideoState = async (
  data: { on: boolean; onComplete: () => void },
  publisher: OT.Publisher
) => {
  const { on, onComplete } = data;
  publisher.publishVideo(on);
  onComplete();
};

export const unpublish = (session: OT.Session, publisher: OT.Publisher) => {
  session.unpublish(publisher);

  session.disconnect();
};
