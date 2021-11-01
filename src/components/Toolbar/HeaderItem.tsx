import React, { SVGProps } from "react";

const HeaderItem = (props: {
  Icon: (props: any) => JSX.Element;
  title: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}) => {
  const { Icon, title, selected, onClick, disabled } = props;
  const currentColor = !disabled
    ? selected
      ? "text-red-400"
      : "text-green-400"
    : "text-gray-600";
  const disabledCursor = disabled ? "hover:cursor-not-allowed" : "";
  return (
    <div
      className={`flex flex-col items-center cursor-pointer  group w-24 sm:w-24 ${currentColor} ${disabledCursor}`}
      onClick={onClick}
    >
      <Icon className="h-8 mb-1 " />
      <p className="opacity-100 tracking-widest truncate">{title}</p>
    </div>
  );
};

export default HeaderItem;
