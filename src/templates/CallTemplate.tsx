import { ReactNode } from "react";

import Link from "next/link";

import { AppConfig } from "../utils/AppConfig";

type ICallProps = {
  meta: ReactNode;
  children: ReactNode;
};

const CallTemplate = (props: ICallProps) => (
  <div className="container mx-auto border-2 border-white h-screen">
    <div className="w-full text-gray-700">
      {props.meta}

      <div className="max-w-screen-md mx-auto broder-b border-red-400 ">
        <div className="py-5 text-xl content">{props.children}</div>

        <div className="border-t border-gray-300 text-center py-8 text-sm">
          © Copyright {new Date().getFullYear()} {AppConfig.title}
        </div>
      </div>
    </div>
  </div>
);

export { CallTemplate };
