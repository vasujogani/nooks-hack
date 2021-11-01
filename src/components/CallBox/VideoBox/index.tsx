import React, { useRef } from "react";
import clsx from "clsx";
import { OpenTokStream } from "../../../context/OpenTokContext";

const VideoBox = (props: { stream: OpenTokStream }) => {
  const videoContainer = useRef<HTMLDivElement>(null);
  const { stream } = props;
  const isMe = stream.id === "me";

  React.useEffect(() => {
    if (videoContainer.current && stream.videoElement) {
      while (videoContainer.current.firstChild) {
        videoContainer.current.removeChild(videoContainer.current.firstChild);
      }
      videoContainer.current.appendChild(stream.videoElement);
    }
  }, [videoContainer, stream, stream.videoElement]);

  return (
    <div
      className={clsx("single-video", "OT_subscriber")}
      id="vasu"
      style={{
        position: "relative",
        height: "100%",
        width: "100%",
      }}
      onClick={(e: any) => {
        e.stopPropagation();
      }}
    >
      <div
        className="OT_video-player-container"
        style={{
          width: "100%",
          height: "100%",
          marginTop: "0px",
          marginLeft: "0px",
          position: "absolute",
          overflow: "hidden",
          border: isMe ? "1px solid red" : undefined,
          borderRadius: "10%",
        }}
      >
        <div
          ref={videoContainer}
          className={clsx(
            "OT_fit-mode-cover",
            "OT_video-element",
            "OT_widget-container"
          )}
          style={{
            height: "100%",
            width: "100%",
          }}
        ></div>
      </div>
    </div>
  );
};

export default VideoBox;
