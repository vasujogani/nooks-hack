import { useRouter } from "next/router";

import { CallTemplate } from "../../templates/CallTemplate";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Header from "../../components/Header";

const Room = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  return (
    <CallTemplate meta={<Header />}>
      <div>Main</div>
      <div>{data}</div>
    </CallTemplate>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { link_id } = context.query;

  console.log("room");
  console.log(link_id);

  return {
    props: {
      data: "genre",
    },
  };
};

export default Room;
