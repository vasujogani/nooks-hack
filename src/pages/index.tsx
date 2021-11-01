import { useRouter } from "next/router";

import axios from "axios";
import { Main } from "../templates/Main";

const Index = () => {
  const router = useRouter();

  const handleOnJoinRoomClick = () => {
    router.push("/call");
  };

  const handleGenerateNewLink = () => {
    axios({
      method: "GET",
      url: "https://us-central1-nooks-hack.cloudfunctions.net/generateLink",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log("response");
      console.log(response.data);
      if (response.data) {
        router.push(`/call/${response.data.link_id}`);
      }
    });
  };
  return (
    <Main meta={<div />}>
      <div>Welcome to Home Page</div>
      <div>input to maybe name the room here</div>
      <div>Button to get a link</div>
      <div>Show the link once it's generated</div>
      <div>option to copy the room link</div>
      <div>Join button to get in the room </div>
      <button
        onClick={handleGenerateNewLink}
        className="bg-transparent hover:bg-green-400 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Go To Room
      </button>
    </Main>
  );
};

export default Index;
