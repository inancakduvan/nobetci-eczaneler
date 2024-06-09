import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { motion } from "framer-motion";

import { IconInfoCircle, IconArrowLeft, IconPhone, IconPhoneCall, IconArrowRight, IconAdjustmentsHorizontal, IconCurrentLocation, IconStarFilled } from "@tabler/icons-react";

import { fetchPharmacies } from "@/utils/fetch";
import { TPharmacies, useGlobalContext } from "@/stores/globalStore";
import { Button } from "@/elements/Button";
import Skeletton from "@/elements/Skeletton/Skeletton";
import { Days, Months } from "@/enums";


type TPharmaciesList = React.FC<{
    city: string;
    district: string;
}>;

export type TPharmaciesResponse = {
  success: boolean;
  result: TPharmacies[];
}

type TCurrentLocation = {
    latitude: number;
    longitude: number;
}

const PharmaciesList: TPharmaciesList = ({city, district}) => {
    const router = useRouter();

    const { t } = useTranslation('common');

    const { pharmacies, setPharmacies } = useGlobalContext();

    const [dayOfWeek, setDayOfWeek] = useState<string>();
    const [nextDayOfWeek, setNextDayOfWeek] = useState<string>();
    const [dayOfMonth, setDayOfMonth] = useState<number>();
    const [month, setMonth] = useState<string>();
    const [year, setYear] = useState<number>();
    const [date, setDate] = useState<string>("-");

    const [isCurrentLocationModelOpen, setIsCurrentLocationModelOpen] = useState<boolean>(false);
    const [currentLocationStatus, setCurrentLocationStatus] = useState<string>("prompt");
    const [currentLocation, setCurrentLocation] = useState<TCurrentLocation | null>();
    const [closestPharmacy, setClosestPharmacy] = useState<TPharmacies | null>();

    const [isPageScrolled, setIsPageScrolled] = useState<boolean>(false);
    const [isFilterButtonLoading, setIsFilterButtonLoading] = useState<boolean>(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const onScroll = (event: Event) => {
            const scrollTop = (event.target as HTMLElement).scrollTop;

            if(scrollTop > 30) {
                setIsPageScrolled(true);
            } else {
                setIsPageScrolled(false);
            }
        }

        if(window) {
            window.scrollTo(0, 0);

            // Window scroll
            document.getElementById("appContainer")?.addEventListener("scroll", onScroll);

            // Date
            const date = new Date();
            
            const _dayOfWeek = t(Days[date.getDay()]);
            const _nextDayOfWeek = t(Days[date.getDay() === 6 ? 0 : date.getDay() + 1]);
            const _dayOfMonth = date.getDate();
            const _month = t(Months[date.getMonth()]);
            const _year = date.getFullYear();
            const _date = _dayOfMonth + " " + _month + " " + _year + ", " + _dayOfWeek; 

            setDayOfWeek(_dayOfWeek);
            setNextDayOfWeek(_nextDayOfWeek);
            setDayOfMonth(_dayOfMonth);
            setMonth(_month);
            setYear(_year);
            setDate(_date);

            // Permission
            navigator.permissions.query({ name: 'geolocation' })
            .then((permisssion) => {
                const state = permisssion.state;
                setCurrentLocationStatus(state);

                if(state === "granted") {
                    navigator.geolocation.watchPosition(function(position) {
                        setCurrentLocation(position.coords);
                    })
                }   
            })
        }

        if(city && district) {
            fetchPharmacies(city, district, 
                (data: TPharmaciesResponse) => {
                    setPharmacies(data.result);
                },
                () => {
                    setHasError(true);
                }
            );
        } else {
            setHasError(true);
        }

        return () => {
            document.getElementById("appContainer")?.removeEventListener("scroll", onScroll);
        }
    }, [])

    useEffect(() => {
        if(currentLocation) {
            findClosestPharmacy(currentLocation.latitude, currentLocation.longitude);
        }
    }, [currentLocation])

    useEffect(() => {
        if(window && closestPharmacy) {
            window.scrollTo(0, 0);
        }
    }, [closestPharmacy])

    const redirectToMap = (coordinates: string) => {
        const splittedCoordinates = coordinates.split(",");
        const lat = splittedCoordinates[0];
        const lng = splittedCoordinates[1];

        const url = "https://www.google.com/maps/search/?api=1&query=" + lat + "," + lng;
        
        window.open(url, "_blank");
    }

    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setCurrentLocationStatus("granted");
            setCurrentLocation(position.coords);

            setIsCurrentLocationModelOpen(false);
        }, function(error) {
            setCurrentLocationStatus("denied");
        });
    }

    const findClosestPharmacy = (userLat: number = 0, userLng: number = 0) => {    
        let closest = 0;
        let closestPharmacy = null;

        for (let item of pharmacies) {
            const location = item.loc.split(",");
            const lat = userLat - Number(location[0]);
            const lng = userLng - Number(location[1]);

            const distance = Math.sqrt((lat * lat) + (lng * lng));
    
            if (!closest || distance < closest) {
                closest = distance;
                closestPharmacy = item;
            }
        }
    
        setClosestPharmacy(closestPharmacy);
    }

    const openFilters = () => {
        setIsFilterButtonLoading(true);
        router.push("/district/" + city);
    }

    if(!(city && district)) {
        return "";
    }

    return (
        <>
            <div className="bg-gradient-greenToWhite225deg min-h-fit-screen">
                <div className="p-medium">
                    {
                        isPageScrolled &&
                        <div className="bg-transparent h-[70px] w-full"></div>
                    }
                    <div className={"transition-all flex items-center justify-center" + (isPageScrolled ? " z-20 fixed left-0 top-0 w-full bg-gradient-whiteToTransparent90deg bg-blur border-b" : " bg-semantic-light border rounded-lg")}>
                        <div className={"max-w-[640px] w-full p-medium shadow-ultra-soft border-solid border-muted-700 bg-transparent"}>
                            <div className="text-heading-medium text-onText-primary">{date}</div>
                            <div className="text-subheading-xsmall text-primary-700 mt-xsmall capitalize">{city} / {district}</div>
                        </div>
                    </div>

                    <div className="mt-medium">
                        <div className="flex gap-xsmall">
                            <div className="text-semantic-warning">
                                <IconInfoCircle size={20} />
                            </div>

                            <div className="text-body-small text-onText-secondary">
                                {t("pharmacyWorkingTimeDesc", {currentDate: date, nextDay: nextDayOfWeek})}
                            </div>
                        </div>
                    </div>

                    <div className="relative mt-xlarge">
                        <div className="text-heading-large text-onText-subdark">{t("pharmaciesOnDuty")}</div>
                        <>
                        {
                            (pharmacies && pharmacies.length > 0) ? 
                            
                                <div className="flex flex-col mt-medium pb-[92px]">
                                    {
                                    pharmacies.map((pharmacy, index) => 
                                    <motion.div 
                                    custom={index}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.04 * index }}
                                    key={"pharmacy-" + pharmacy.name + pharmacy.phone + pharmacy.loc}
                                    className={(closestPharmacy && (closestPharmacy.phone === pharmacy.phone)) ? "-order-1" : ""}
                                    >
                                        <div  className="shadow-ultra-soft border border-muted-700 border-solid bg-semantic-light mb-medium rounded-lg">
                                            <div className="flex items-center justify-between p-medium border-b border-solid border-muted-600 text-heading-medium text-onText-primary">
                                                {pharmacy.name} 
                                                
                                                {(closestPharmacy && (closestPharmacy.phone === pharmacy.phone)) && 
                                                    <div className="inline-flex gap-small px-[12px] py-[6px] bg-helper-yellow-400 rounded border border-solid border-helper-yellow-700">
                                                        <div className="text-helper-yellow-700">
                                                            <IconStarFilled size={16} />
                                                        </div>
                                                        
                                                        <div className="text-onText-subdark text-subheading-xsmall">
                                                            {t("closest")}
                                                        </div>
                                                    </div>
                                                }
                                            </div>

                                            <div className="px-medium pt-small pb-medium">
                                                <div className="text-body-small text-onText-subdark">{pharmacy.address}</div>
                                                
                                                <div className="flex items-center gap-xsmall mt-medium"> 
                                                    <div className="inline-flex text-primary-400 -translate-y-[1px]">
                                                        <IconPhone size={18} />
                                                    </div>

                                                    <a href={"tel:" + pharmacy.phone} className="block text-subheading-medium text-onText-subdark underline">{pharmacy.phone}</a>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-end gap-medium p-medium">
                                                <Button type="secondary" text={t("seeOnMap")} Icon={IconArrowRight} iconPosition="right" onClick={() => redirectToMap(pharmacy.loc)} />
                                                
                                                <a href={"tel:" + pharmacy.phone}>
                                                    <Button type="primary-light" className="md:hidden" Icon={IconPhoneCall} />
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>)
                                    }
                                </div>
                            :
                            <>
                            {
                            hasError ?
                            <div className="z-40 fixed top-0 left-0 w-full h-fit-screen flex items-center justify-center bg-muted-700">
                                <div className="inline-flex flex-col px-large py-medium bg-white shadow-ultra-soft rounded-lg">
                                <div className="text-body-medium text-center mb-medium">
                                    {t("errorMessage")}
                                </div>

                                <Button type="primary" Icon={IconArrowLeft} text={t("goBack")} onClick={() => router.push("/city")} />
                                </div>
                            </div>
                            :
                            <Skeletton />
                            }
                            </>
                        }
                        </>
                    </div>
                </div>
            </div>

           {
            pharmacies.length > 0 &&  
            <div className="fixed left-0 bottom-0 flex items-center justify-center gap-medium w-full px-medium py-xxlarge bg-gradient-whiteToBlack">
                {currentLocationStatus !== "granted" && <Button type="rounded" Icon={IconCurrentLocation} className="capitalize" onClick={() => setIsCurrentLocationModelOpen(true)} />}
                <Button type="primary" text={district} Icon={IconAdjustmentsHorizontal} className="capitalize" isLoading={isFilterButtonLoading} onClick={openFilters} />
            </div>
           }

           {
            isCurrentLocationModelOpen &&
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div className="z-20 fixed top-0 left-0 flex items-center justify-center w-full h-fit-screen p-medium bg-overlay-30">
                    <motion.div 
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                    >
                        <div className="bg-semantic-light rounded-lg overflow-hidden">
                            <div className="px-medium pt-medium">
                                <div className="text-heading-medium text-onText-primary mb-small uppercase">{t("allowLocationTitle")}</div>
                                <div className="text-body-small text-onText-secondary mb-xlarge">
                                    {currentLocationStatus === "denied" ? t("allowLocationDeniedDesc") : t("allowLocationDesc")}
                                </div>
                            </div>

                            <div className="flex h-[50px]">
                                {
                                    currentLocationStatus === "denied" ?
                                    <>
                                        <div className="flex-1 flex items-center justify-center bg-muted-400 text-subheading-small text-onText-primary border-t border-solid border-muted-700 cursor-pointer" onClick={() => setIsCurrentLocationModelOpen(false)}>
                                            {t("okay")}
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="flex-1 flex items-center justify-center bg-muted-400 text-subheading-small text-onText-primary border-t border-r border-solid border-muted-700 cursor-pointer" onClick={() => setIsCurrentLocationModelOpen(false)}>
                                            {t("cancel")}
                                        </div>

                                        <div className="flex-1 flex items-center justify-center bg-muted-400 text-subheading-small text-onText-primary border-t border-solid border-muted-700 cursor-pointer" onClick={getCurrentLocation}>
                                            {t("allowLocationTitle")}
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
           }
        </>
    )
}

export default PharmaciesList;