import React, { SVGProps } from "react";

const HeaderItem = (props: {
  Icon: (props: any) => JSX.Element;
  title: string;
  selected: boolean;
}) => {
  const { Icon, title, selected } = props;
  const currentColor = selected ? "text-red-400" : "text-green-400";
  return (
    <div
      className={`flex flex-col items-center cursor-pointer group w-20 sm:w-20 ${currentColor}`}
    >
      <Icon className="h-8 mb-1 group-hover:animate-bounce" />
      <p className="opacity-0 group-hover:opacity-100 tracking-widest truncate">
        {title}
      </p>
    </div>
  );
};

export default HeaderItem;
