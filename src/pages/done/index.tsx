import { useRouter } from "next/router";

import { Main } from "../../templates/Main";

const Call = ({}) => {
  const router = useRouter();

  const handleGoBackToMainPage = () => {
    router.push("/");
  };
  return (
    <Main meta={<div />}>
      <div className="text-4xl">Thanks for using Nooks</div>
      <div className="text-xl mt-8">
        You can find a summary of your call here (like talk time, number of side
        convos, etc)
      </div>

      <button
        onClick={() => {}}
        className="mt-8 bg-transparent hover:bg-green-400 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Share It With Friends
      </button>
    </Main>
  );
};

export default Call;
