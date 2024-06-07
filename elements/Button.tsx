import React, { RefAttributes } from "react";
import { IconProps, Icon } from "@tabler/icons-react";

type TButton = React.FC<{
  type: "primary" | "primary-light" | "secondary" | "rounded";
  text?: string;
  Icon?: TIcon;
  iconPosition?: string;
  iconClassName?: string;
  className?: string;
  onClick?: Function;
}>;

type TIcon = React.ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;

export const Button: TButton = ({ type, text, Icon, iconPosition = "left", iconClassName, className, onClick }) => {
  
  const getButtonClassName = ():string => {
    switch(type) {
      case "primary-light":
        return "bg-primary-400 w-[36px] h-[36px] rounded";
      case "secondary":
        return "bg-muted-500 border-muted-700 border border-solid rounded py-[5px] px-[16px]";
      case "rounded":
        return "bg-primary-300 w-[44px] h-[44px] border-primary-700 border border-solid rounded-full";
      default:
        return "bg-primary-700 py-[12px] px-[24px] rounded-full text-semantic-light text-heading-medium";
    }
  }

  const getIconSize = ():number => {
    switch(type) {
      case "primary-light" || "secondary":
        return 16;
      default:
        return 20;
    }
  }

  const getIconColor = ():string => {
    switch(type) {
      case "secondary":
        return "text-primary-400";
      case "rounded":
        return "text-primary-700";
      default:
        return "text-primary-light";
    }
  }

  return (
    <button
        className={"inline-flex items-center justify-center gap-[8px] pointer duration-300 active:opacity-80 sm:hover:opacity-80 " + (getButtonClassName()) + (className ? " " + className : "")}
        onClick={onClick ? () => onClick() : undefined}
    >
        {Icon && iconPosition !== "right" ? <div className={getIconColor() + (iconClassName ? " " + iconClassName : "")}><Icon size={getIconSize()}  /></div> : null}

        {text ? text : null}

        {Icon && iconPosition === "right" ? <div className={getIconColor() + (iconClassName ? " " + iconClassName : "")}><Icon size={getIconSize()}  /></div> : null}
    </button>
  );
};