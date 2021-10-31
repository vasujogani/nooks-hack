import { useRouter } from "next/router";
import { useEffect, useContext } from "react";

import { CallTemplate } from "../../templates/CallTemplate";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Toolbar from "../../components/Toolbar";

import dynamic from "next/dynamic";

const CallBox = dynamic(
  () => {
    return import("../../components/CallBox");
  },
  { ssr: false }
);

import { Context as OpenTokContext } from "../../context/OpenTokContext";

const Room = ({
  sessionToken,
  linkId,
  sessionId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  useEffect(() => {
    console.log("windoww: ");
    console.log(window.length);
    // startJoiningRoomAction(linkId, sessionToken);
  }, []);

  return (
    <CallTemplate toolbar={<Toolbar />}>
      <div className="flex flex-1 h-100 flex-col">
        Main
        <div>{sessionToken}</div>
        <div>{linkId}</div>
        <CallBox
          sessionToken={sessionToken}
          linkId={linkId}
          sessionId={sessionId}
        />
      </div>
    </CallTemplate>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { link_id } = context.query;

  console.log("room");
  console.log(link_id);

  return {
    props: {
      sessionToken:
        "T1==cGFydG5lcl9pZD00NjkwODcwNCZzaWc9NjQ1YWFlZjkzMGE5ZWQ5ZGRmMjM1NDE2YjJjOTI4Y2U1OGIwMzc1NTpzZXNzaW9uX2lkPTFfTVg0ME5qa3dPRGN3Tkg1LU1UWXhOemN6TWprM09EVTNObjVLZG5kaEwyWkhZMVp0YjJoWlVGUk5VMDVSU2t4TE9WZC1mZyZjcmVhdGVfdGltZT0xNjM1Njc2NzE4JmV4cGlyZV90aW1lPTE2MzU3NjMxMTgmcm9sZT1wdWJsaXNoZXImbm9uY2U9NTE5NTc2JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9JmNvbm5lY3Rpb25fZGF0YT0lN0IlMjJuYW1lJTIyJTNBKyUyMkpvbitSb2JlcnQlMjIlMkMrJTIyaWQlMjIlM0ErJTIyMTAxODA3Nzk4OTE5NzA5MDUzMTAwJTIyJTJDKyUyMnByb2ZfcGljJTIyJTNBKyUyMmh0dHBzJTNBJTJGJTJGbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbSUyRi04bVJTQWZZaG9URSUyRkFBQUFBQUFBQUFJJTJGQUFBQUFBQUFBQUElMkZBTVp1dWNuV0RUOXhQeTRyZHRkSlJMNC0xY2VVWWZpVm93JTJGczk2LWMlMkZwaG90by5qcGclMjIlN0Q=",
      linkId: "Nooks/5GpdanFm2oLIlVMx/desks/101807798919709053100",
      sessionId:
        "1_MX40NjkwODcwNH5-MTYxNzczMjk3ODU3Nn5KdndhL2ZHY1Ztb2hZUFRNU05RSkxLOVd-fg",
    },
  };
};

export default Room;
