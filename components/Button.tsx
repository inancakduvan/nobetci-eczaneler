import * as React from "react";
import { Icon } from "./Icon";

type TButton = React.FC<{
  text?: string;
  icon?: string;
  iconPosition?: string;
  className?: string;
  onClick?: Function;
}>;

export const Button: TButton = ({ text, icon, iconPosition = "left", className, onClick }) => {
  return (
    <button
        className={"inline-flex items-center justify-center gap-[8px] text-heading-medium text-semantic-light bg-primary-700 py-[12px] px-[24px] rounded-full pointer duration-300 active:opacity-80 hover:opacity-80" + (className ? " " + className : "")}
        onClick={onClick ? () => onClick() : undefined}
    >
        {icon && iconPosition !== "right" ? <Icon name={icon} size={20} className="text-semantic-light" /> : null}

        {text ? text : null}

        {icon && iconPosition === "right" ? <Icon name={icon} size={20} className="text-semantic-light" /> : null}
    </button>
  );
};