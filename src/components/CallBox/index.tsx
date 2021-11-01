import React, { useContext, useEffect } from "react";
import {
  Context as OpenTokContext,
  OpenTokStream,
} from "../../context/OpenTokContext";
import ResizeObserver from "rc-resize-observer";
import VideoBox from "./VideoBox";

import initLayoutContainer, { options } from "../../layout/layoutConfig";

const CallBox = (props: {
  sessionToken: string;
  linkId: string;
  sessionId: string;
}) => {
  const { sessionToken, linkId, sessionId } = props;
  const {
    state: { streams },
    startJoiningRoomAction,
  } = useContext(OpenTokContext);
  console.log("state");

  useEffect(() => {
    console.log("ih");
    startJoiningRoomAction(sessionId, sessionToken, linkId);
  }, []);
  return (
    <ResizeObserver
      onResize={() => {
        // eslint-disable-next-line prefer-const
        let resizeTimeout;
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          // OpenTokController.layoutContainer?.layout();
        }, 100);
      }}
    >
      <div
        id="layoutContainer"
        ref={(node) => {
          // @ts-ignore
          initLayoutContainer && initLayoutContainer(node, { ...options });
        }}
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flex: 1,
        }}
      >
        {(Object.values(streams) as OpenTokStream[]).map(
          (stream: OpenTokStream, idx: number) => (
            <VideoBox key={idx} stream={stream} />
          )
        )}
      </div>
    </ResizeObserver>
  );
};

export default CallBox;
