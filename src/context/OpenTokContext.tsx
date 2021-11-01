import {
  connectToOpenTokRoom,
  initToOpenTokRoom,
  publish,
  setAudioState,
  setVideoState,
  streamPropertyChangedParamType,
  subscribe,
  subscribeToUpdates,
} from "../services/OpenTokController";
import createDataContext from "./createDataContext";

const START_LOADING = "START_LOADING";
const DONE_LOADING = "DONE_LOADING";

const IN_ROOM = "IN_ROOM";
const NOT_IN_ROOM = "NOT_IN_ROOM";

const SET_ROOM_VOLUME = "SET_ROOM_VOLUME";

const ADD_STREAM = "ADD_STREAM";
const UPDATE_STREAM = "UPDATE_STREAM";
const REMOVE_STREAM = "REMOVE_STREAM";

const SET_MY_PUBLISHER = "SET_MY_PUBLISHER";
const SET_SESSION_TOKEN = "SET_SESSION_TOKEN";
const SET_SESSION_ID = "SET_SESSION_ID";
const SET_LINK_ID = "SET_LINK_ID";
const SET_SESSION = "SET_SESSION";
const SET_ERROR = "SET_ERROR";

export type OpenTokStream = {
  stream: OT.Stream;
  videoElement: HTMLVideoElement | null;
  audioOn: boolean;
  videoOn: boolean;
  type: string;
  id: string;
  subscriber: OT.Subscriber | null;
};

export type OpenTokState = {
  loading: boolean;
  inRoom: boolean;
  roomVolume: number;
  streams: Record<string, OpenTokStream>;
  session: OT.Session | null;
  publisher: OT.Publisher | null;
  sessionToken: string | null;
  publishError: boolean;
  sessionId: string | null;
  linkId: string | null;
};

const initialState: OpenTokState = {
  loading: false,
  inRoom: false,
  roomVolume: 80,
  streams: {},
  session: null,
  publisher: null,
  sessionToken: null,
  sessionId: null,
  linkId: null,
  publishError: false,
};

const openTokReducer = (
  state: OpenTokState = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, loading: true };

    case DONE_LOADING:
      return { ...state, loading: false };

    case IN_ROOM:
      return { ...state, inRoom: true };

    case ADD_STREAM:
      return {
        ...state,
        streams: { ...state.streams, [action.payload.id]: action.payload },
      };

    case UPDATE_STREAM:
      return {
        ...state,
        streams: {
          ...state.streams,
          [action.payload.id]: {
            ...(state.streams[action.payload.id]
              ? state.streams[action.payload]
              : {}),
            ...action.payload,
          },
        },
      };

    case REMOVE_STREAM:
      const keyToDelete = action.payload;
      const newStreams = { ...state.streams };
      delete newStreams[keyToDelete];
      return {
        ...state,
        streams: {
          ...newStreams,
        },
      };
    case SET_MY_PUBLISHER:
      return { ...state, publisher: action.payload };

    case SET_SESSION:
      return {
        ...state,
        session: action.payload,
      };

    case SET_SESSION_TOKEN:
      return {
        ...state,
        sessionToken: action.payload,
      };

    case SET_SESSION_ID:
      return {
        ...state,
        sessionId: action.payload,
      };

    case SET_LINK_ID:
      return { ...state, linkId: action.payload };

    case SET_ERROR:
      return {
        ...state,
        publishError: action.payload,
      };

    default:
      return state;
  }
};

const handleStreamPropertyChanged = (
  event: streamPropertyChangedParamType
) => {};

const startJoiningRoomAction =
  (dispatch: any) =>
  async (sessionId: string, sessionToken: string, linkId: string) => {
    console.log("hi start jiong");
    dispatch({ type: START_LOADING });
    dispatch({ type: SET_SESSION_TOKEN, payload: sessionToken });
    dispatch({ type: SET_SESSION_ID, payload: sessionId });
    dispatch({ type: SET_LINK_ID, payload: linkId });
    const session = await initToOpenTokRoom({
      sessionId,
    });
    console.log(session);
    if (session) {
      dispatch({ type: SET_SESSION, payload: session });

      const handleStreamCreated = async (
        session: OT.Session,
        stream: OT.Stream
      ) => {
        console.log("******hanlde stream created");
        const type: "camera" | "screen" | "custom" = stream.videoType;
        const subscriber = await subscribe(session, stream);
        if (subscriber) {
          subscriber.setAudioVolume(80);
          const videoElement = (subscriber as any).videoElement();

          if (videoElement) {
            videoElement.className = "OT_video-element";
          }
          console.log("video element");
          console.log(videoElement);

          dispatch({
            type: ADD_STREAM,
            payload: {
              id: stream.connection.connectionId,
              audioOn: stream.hasAudio,
              videoOn: stream.hasVideo,
              videoElement,
              type,
              subscriber,
            },
          });

          subscriber.on("videoDisabled", async (_) => {
            dispatch({ type: UPDATE_STREAM, payload: { videoOn: false } });
          });

          subscriber.on("videoEnabled", async (_) => {
            dispatch({ type: UPDATE_STREAM, payload: { videoOn: true } });
          });
        } else {
          dispatch({
            type: SET_ERROR,
            payload: "Failed to subscribe ",
          });
        }
      };

      const handleStreamDestroyed = (stream: OT.Stream) => {
        dispatch({
          type: REMOVE_STREAM,
          payload: stream.connection.connectionId,
        });
      };

      subscribeToUpdates(session, {
        handleStreamCreated,
        handleStreamDestroyed,
        handleStreamPropertyChanged,
      });

      if (!(await connectToOpenTokRoom(session, sessionToken))) {
        dispatch({ type: SET_ERROR, payload: "connect to opentok room" });
      }

      const publisher = await publish(session, {
        audioOn: false,
        videoOn: true,
      });

      if (publisher) {
        const myVideoElement = (publisher as any).videoElement();
        if (myVideoElement) {
          myVideoElement.className = "OT_video-element";
          dispatch({
            type: ADD_STREAM,
            payload: {
              id: "me",
              audioOn: false,
              videoOn: true,
              videoElement: myVideoElement,
              type: "video",
              subscriber: null,
            },
          });
        }
      }

      if (publisher) {
        dispatch({ type: SET_MY_PUBLISHER, payload: publisher });
        dispatch({ type: IN_ROOM });
        dispatch({ type: DONE_LOADING });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: "Failed to publish using publisher",
        });
      }
    } else {
      dispatch({ type: SET_ERROR, payload: "Failed to get a session" });
    }
  };

const toggleAudio =
  (dispatch: any) => (on: boolean, publisher: OT.Publisher) => {
    console.log("about to toggle audio");
    setAudioState({ on, onComplete: () => {} }, publisher);
    dispatch({ type: UPDATE_STREAM, payload: { id: "me", audioOn: on } });
  };

const toggleCamera =
  (dispatch: any) => (on: boolean, publisher: OT.Publisher) => {
    console.log("about to toggle audio");
    setVideoState({ on, onComplete: () => {} }, publisher);
    dispatch({ type: UPDATE_STREAM, payload: { id: "me", videoOn: on } });
  };

export const { Context, Provider } = createDataContext(
  openTokReducer,
  { startJoiningRoomAction, toggleCamera, toggleAudio },
  initialState
);
