import { useRouter } from "next/router";

import { Main } from "../../templates/Main";

import Header from "../../components/Header";

const Call = ({}) => {
  const router = useRouter();

  const handleGoBackToMainPage = () => {
    router.push("/");
  };
  return (
    <Main meta={<div />}>
      <div>Call /</div>
      <div>no room found</div>
      <button
        onClick={handleGoBackToMainPage}
        className="bg-transparent hover:bg-green-400 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Go To Main Page
      </button>
    </Main>
  );
};

export default Call;
