import * as React from "react";
import { Icon } from "./Icon";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config";

type TButton = React.FC<{
  type: "primary" | "primary-light" | "secondary" | "rounded";
  text?: string;
  icon?: string;
  iconPosition?: string;
  className?: string;
  onClick?: Function;
}>;

export const Button: TButton = ({ type, text, icon, iconPosition = "left", className, onClick }) => {
  
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

  const getIconColor= ():string => {
    const colors = tailwindConfig?.theme?.extend?.colors;

    switch(type) {
      case "secondary":
        // @ts-ignore: Unreachable code error
        const secondaryColor = colors?.primary["400"]
        return secondaryColor;
      case "rounded":
        // @ts-ignore: Unreachable code error
        const roundedColor = colors?.primary["700"]
        return roundedColor;
      default:
        // @ts-ignore: Unreachable code error
        const defaultColor = colors?.semantic["light"]
        return defaultColor;
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

  return (
    <button
        className={"inline-flex items-center justify-center gap-[8px] pointer duration-300 active:opacity-80 sm:hover:opacity-80 " + (getButtonClassName()) + (className ? " " + className : "")}
        onClick={onClick ? () => onClick() : undefined}
    >
        {icon && iconPosition !== "right" ? <Icon name={icon} size={getIconSize()} stroke={getIconColor()} /> : null}

        {text ? text : null}

        {icon && iconPosition === "right" ? <Icon name={icon} size={getIconSize()} stroke={getIconColor()} /> : null}
    </button>
  );
};