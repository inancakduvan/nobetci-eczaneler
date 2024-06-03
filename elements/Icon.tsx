import { ReactElement, useEffect, useRef, useState } from "react";

import AdjustmentsHorizontal2 from '@/public/static/icons/tabler-icon-adjustments-horizontal-2.svg';
import AdjustmentsHorizontal from '@/public/static/icons/tabler-icon-adjustments-horizontal.svg';
import ArrowLeft from '@/public/static/icons/tabler-icon-arrow-left.svg';
import ArrowRight from '@/public/static/icons/tabler-icon-arrow-right.svg';
import CalendarDue from '@/public/static/icons/tabler-icon-calendar-due.svg';
import CurrentLocation from '@/public/static/icons/tabler-icon-current-location.svg';
import HomeStar from '@/public/static/icons/tabler-icon-home-star.svg';
import InfoCircle from '@/public/static/icons/tabler-icon-info-circle.svg';
import PhoneCall from '@/public/static/icons/tabler-icon-phone-call.svg';
import Phone from '@/public/static/icons/tabler-icon-phone.svg';
import Search from '@/public/static/icons/tabler-icon-search.svg';
import StarFilled from '@/public/static/icons/tabler-icon-star-filled.svg';
import Star from '@/public/static/icons/tabler-icon-star.svg';


type TIcon = React.FC<{
  name: string;
  size: number;
  stroke?: string;
  fill?: string;
  className?: string;
}>;

type TIconSet = {
  [name:string]: ReactElement;
};

export const Icon: TIcon = ({ name, size = 20, stroke = "#fff", fill = "transparent", className }) => {
  const [iconSet, setIconSet] = useState<TIconSet>();

  useEffect(() => {
    setIconSet(
      {
        "adjustments-horizontal-2": <AdjustmentsHorizontal2 />,
        "adjustments-horizontal": <AdjustmentsHorizontal />,
        "arrow-left": <ArrowLeft />,
        "arrow-right": <ArrowRight />,
        "calendar-due": <CalendarDue />,
        "current-location": <CurrentLocation />,
        "home-star": <HomeStar />,
        "info-circle": <InfoCircle />,
        "phone-call": <PhoneCall />,
        "phone": <Phone />,
        "search": <Search />,
        "star-filled": <StarFilled />,
        "star": <Star />
      }
    )
  }, [])

  return (
    <>
      {
        iconSet ?
          <svg className={className ? " " + className : ""} width={size} height={size} stroke={stroke} fill={fill} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            { iconSet[name as keyof TIconSet] } 
          </svg>
        :
          <div className={`w-[20px] h-[20px] rounded bg-overlay-30`}></div>
      } 
    </>  
  );
};