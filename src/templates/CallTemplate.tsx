import { ReactNode } from "react";

type ICallProps = {
  toolbar: ReactNode;
  children: ReactNode;
};

const CallTemplate = (props: ICallProps) => (
  <div className="mx-auto h-screen overflow-x-hidden">
    <div className="w-full text-gray-700 h-full border-2 border-white flex flex-1 flex-col justify-between">
      <div className="flex flex-1 py-5 text-xl content border-2 border-green-400">
        {props.children}
      </div>
      {props.toolbar}
    </div>
  </div>
);

export { CallTemplate };
