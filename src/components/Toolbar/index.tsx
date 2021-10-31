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
import Image from "next/image";
import HeaderItem from "./HeaderItem";

const Header = () => {
  return (
    <header className="flex flex-col sm:flex-row m-5 justify-between items-center h-auto">
      <div className="flex flex-grow justify-evenly max-w-2xl">
        <HeaderItem title="Audio" Icon={MicrophoneIcon} selected={false} />
        <HeaderItem title="Camera" Icon={VideoCameraIcon} selected={true} />
        <HeaderItem
          title="Screenshare"
          Icon={PresentationChartLineIcon}
          selected={true}
        />
        <HeaderItem title="Copy Link" Icon={ShareIcon} selected={false} />
        <HeaderItem title="Logout" Icon={LogoutIcon} selected={false} />
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
