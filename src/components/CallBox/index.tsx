import React, { useContext, useEffect } from "react";
import { Context as OpenTokContext } from "../../context/OpenTokContext";

const CallBox = (props: {
  sessionToken: string;
  linkId: string;
  sessionId: string;
}) => {
  const { sessionToken, linkId, sessionId } = props;
  const {
    state: { loading, inRoom },
    startJoiningRoomAction,
  } = useContext(OpenTokContext);
  console.log("state");
  console.log(startJoiningRoomAction);

  useEffect(() => {
    console.log("ih");
    startJoiningRoomAction(sessionId, sessionToken, linkId);
  }, []);
  return (
    <div>
      {inRoom ? "in room " : "not in room"}
      {loading ? "loading" : "done loading"}
    </div>
  );
};

export default CallBox;
