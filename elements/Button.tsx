import React, { RefAttributes } from "react";
import { IconProps, Icon } from "@tabler/icons-react";
import Spinner from "./Spinner/Spinner";

type TIcon = React.ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
type TButtonType = "primary" | "primary-light" | "secondary" | "rounded";

interface IButtonProps {
  type: TButtonType;
  text?: string;
  isLoading?: boolean;
  Icon?: TIcon;
  iconPosition?: string;
  iconClassName?: string;
  className?: string;
  onClick?: Function;
};

const getButtonClassName = (type: string) => {
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

const getIconSize = (type: string) => {
  switch(type) {
    case "primary-light" || "secondary":
      return 16;
    default:
      return 20;
  }
}

const getIconColor = (type: string) => {
  switch(type) {
    case "secondary":
      return "text-primary-400";
    case "rounded":
      return "text-primary-700";
    default:
      return "text-onText-light";
  }
}

export const Button = ({ type, text, isLoading, Icon, iconPosition = "left", iconClassName, className, onClick }: IButtonProps) => {
  return (
    <button
        className={"inline-flex items-center justify-center gap-[8px] cursor-pointer duration-300 active:opacity-80 sm:hover:opacity-80 select-none	" + (getButtonClassName(type)) + (className ? " " + className : "")}
        onClick={onClick ? () => onClick() : undefined}
    >
        {
          isLoading ?
          <Spinner />
          :
          <>
          {text ? text : null}

          {Icon ? <div className={(iconPosition === "right" ? "" : "-order-1 ") + getIconColor(type) + (iconClassName ? " " + iconClassName : "")}><Icon size={getIconSize(type)}  /></div> : null}
          </>
        }
    </button>
  );
};