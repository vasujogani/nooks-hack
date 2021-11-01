import { useRouter } from "next/router";
import { DuplicateIcon } from "@heroicons/react/outline";

import axios from "axios";
import { Main } from "../templates/Main";
import { useState } from "react";

const Index = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [linkId, setLinkId] = useState("");

  const handleOnJoinRoomClick = () => {
    router.push(`/call/${linkId}`);
  };
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`localhost:3000/call/${linkId}`);
  };

  const handleGenerateNewLink = () => {
    setLoading(true);
    axios({
      method: "GET",
      url: "https://us-central1-nooks-hack.cloudfunctions.net/generateLink",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("response");
        setLoading(false);
        console.log(response.data);
        if (response.data) {
          // router.push(`/call/${response.data.link_id}`);
          setLinkId(response.data.link_id);
        }
      })
      .catch((e) => {
        setLoading(false);
      });
  };
  return (
    <Main meta={<div />}>
      <div className="text-4xl">Welcome to Nooks</div>
      {!linkId && (
        <button
          onClick={handleGenerateNewLink}
          className="mt-8 self-center bg-transparent hover:bg-green-400 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Generate a new room link
        </button>
      )}
      {!linkId && loading && (
        <div className="flex flex-row items-center justify-center mt-8">
          <div className="h-2 w-2 animate-pulse bg-white ml-3" />
          <div className="h-2 w-2 animate-pulse bg-white ml-3" />
          <div className="h-2 w-2 animate-pulse bg-white ml-3" />
        </div>
      )}
      {linkId && (
        <div className="flex flex-row items-center justify-center mt-8">
          <button
            onClick={handleOnJoinRoomClick}
            className="bg-transparent hover:bg-green-400 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Go To Room
          </button>
          <button onClick={handleCopyLink}>
            <DuplicateIcon className="h-8 ml-4" />
          </button>
        </div>
      )}
    </Main>
  );
};

export default Index;
