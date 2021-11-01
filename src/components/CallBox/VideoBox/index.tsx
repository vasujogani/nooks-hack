import React, { useRef } from "react";
import clsx from "clsx";
import { OpenTokStream } from "../../../context/OpenTokContext";

const VideoBox = (props: { stream: OpenTokStream }) => {
  const videoContainer = useRef<HTMLDivElement>(null);
  const { stream } = props;

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
        border: "1px solid red",
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
          borderRadius: "10%",
          border: "2px solid blue",
        }}
      >
        <div
          ref={videoContainer}
          className={clsx(
            "OT_fit-mode-cover",
            "OT_video-element",
            "OT_widget-container"
          )}
          style={{ height: "100%", width: "100%", position: "relative" }}
        ></div>

        <div>Video Box</div>
      </div>
    </div>
  );
};

export default VideoBox;
