import React, { RefAttributes } from "react";
import { IconProps, Icon } from "@tabler/icons-react";
import Spinner from "./Spinner/Spinner";

type TButton = React.FC<{
  type: "primary" | "primary-light" | "secondary" | "rounded";
  text?: string;
  isLoading?: boolean;
  Icon?: TIcon;
  iconPosition?: string;
  iconClassName?: string;
  className?: string;
  onClick?: Function;
}>;

type TIcon = React.ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;

export const Button: TButton = ({ type, text, isLoading, Icon, iconPosition = "left", iconClassName, className, onClick }) => {
  
  const getButtonClassName = ():string => {
    switch(type) {
      case "primary-light":
        return "bg-primary-400 w-[40px] h-[40px] rounded-full";
      case "secondary":
        return "bg-muted-400 border-primary-300 border border-solid rounded-[99px] py-[7px] px-[18px] text-onText-primary text-body-medium";
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
        return "text-onText-light";
    }
  }

  return (
    <button
        className={"inline-flex items-center justify-center gap-[8px] cursor-pointer duration-300 active:opacity-80 sm:hover:opacity-80 select-none	" + (getButtonClassName()) + (className ? " " + className : "")}
        onClick={onClick ? () => onClick() : undefined}
    >
        {
          isLoading ?
          <Spinner />
          :
          <>
          {Icon && iconPosition !== "right" ? <div className={getIconColor() + (iconClassName ? " " + iconClassName : "")}><Icon size={getIconSize()}  /></div> : null}

          {text ? text : null}

          {Icon && iconPosition === "right" ? <div className={getIconColor() + (iconClassName ? " " + iconClassName : "")}><Icon size={getIconSize()}  /></div> : null}
          </>
        }
    </button>
  );
};