import { ReactNode } from "react";

import Link from "next/link";

import { AppConfig } from "../utils/AppConfig";

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="mx-auto h-screen overflow-x-hidden">
    <div className="w-full text-gray-700 h-full border-2 border-white flex flex-1 flex-col justify-between">
      <div className="max-w-screen-md mx-auto flex justify-center items-center">
        <div className="py-5 text-xl content flex items-center justify-center flex-col">
          {props.children}
        </div>
      </div>
    </div>
    <div className="text-center py-8 text-sm self-center">
      © Copyright {new Date().getFullYear()} {AppConfig.title}
    </div>
  </div>
);

export { Main };
