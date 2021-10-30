import { ReactNode } from "react";

import Link from "next/link";

import { AppConfig } from "../utils/AppConfig";

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="container mx-auto border h-screen flex flex-col items-stretch justify-between">
    <div className="w-full border-2 border-white ">
      {props.meta}

      <div className="max-w-screen-md mx-auto flex">
        <div className="py-5 text-xl content">{props.children}</div>
      </div>
    </div>
    <div className="text-center py-8 text-sm self-center">
      © Copyright {new Date().getFullYear()} {AppConfig.title}
    </div>
  </div>
);

export { Main };
