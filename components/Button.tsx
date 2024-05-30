import * as React from "react";

type TButton = React.FC<{
  text?: string;
  className?: string;
  onClick?: Function;
}>;

export const Button: TButton = ({ text, className, onClick }) => {
  return (
    <button
        className={"text-heading-medium text-semantic-light bg-primary-700 py-[12px] px-[24px] rounded-full pointer duration-300 active:opacity-80 hover:opacity-80" + (className ? " " + className : "")}
        onClick={onClick ? () => onClick() : undefined}
    >
      {text}
    </button>
  );
};