import {
  BadgeCheckIcon,
  CollectionIcon,
  HomeIcon,
  LightningBoltIcon,
  SearchIcon,
  UserIcon,
  VideoCameraIcon,
  MicrophoneIcon,
  PresentationChartLineIcon,
  ShareIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { useContext } from "react";
import Image from "next/image";
import HeaderItem from "./HeaderItem";
import { Context as OpenTokContext } from "../../context/OpenTokContext";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  const {
    toggleAudio,
    toggleCamera,
    state: { streams, publisher, linkId },
  } = useContext(OpenTokContext);

  const audioOn = streams["me"]?.audioOn ?? false;
  const videoOn = streams["me"]?.videoOn ?? false;

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center h-auto">
      <div className="flex flex-grow justify-evenly max-w-2xl">
        <HeaderItem
          onClick={() => {
            console.log("clicked toggle toolbar");
            toggleAudio(!audioOn, publisher);
          }}
          title="Audio"
          Icon={MicrophoneIcon}
          selected={!audioOn}
        />
        <HeaderItem
          onClick={() => {
            toggleCamera(!videoOn, publisher);
          }}
          title="Camera"
          Icon={VideoCameraIcon}
          selected={!videoOn}
        />
        <HeaderItem
          onClick={() => {}}
          title="Screenshare"
          Icon={PresentationChartLineIcon}
          selected={true}
          disabled
        />
        <HeaderItem
          onClick={() => {
            navigator.clipboard.writeText(
              `https://localhost:3000/call/${linkId}`
            );
          }}
          title="Copy Link"
          Icon={ShareIcon}
          selected={false}
        />
        <HeaderItem
          onClick={() => {
            router.push("/");
          }}
          title="End"
          Icon={LogoutIcon}
          selected={false}
        />
      </div>
      <Image
        className="object-contain"
        src="https://uploads-ssl.webflow.com/5fdbdaa454dca67f34595d41/60d23ee5b5312ff9815264f5_NooksLogo.svg"
        width={180}
        height={70}
      />
    </header>
  );
};

export default Header;
