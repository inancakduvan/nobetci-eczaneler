import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { motion } from "framer-motion";

import { IconInfoCircle, IconPhone, IconPhoneCall, IconAdjustmentsHorizontal, IconCurrentLocation, IconStarFilled, IconMapUp, IconSettings, IconReportOff } from "@tabler/icons-react";

import { fetchPharmacies } from "@/utils/fetch";
import { TPharmacies, useGlobalContext } from "@/stores/globalStore";
import { Button } from "@/elements/Button";
import Skeletton from "@/elements/Skeletton/Skeletton";
import { Days, Months } from "@/enums";
import { findDistanceAsKm } from "@/utils/location";
import { clearAllStorageData } from "@/utils/storage";
import SettingsModal from "./SettingsModal";
import ErrorPage from "./ErrorPage";
import LocationPermissionModal from "./LocationPermissionModal";


type TPharmaciesList = React.FC<{
    city: string;
    district: string;
}>;

export type TPharmaciesResponse = {
  success: boolean;
  data: TPharmacies[];
}

const PharmaciesList: TPharmaciesList = ({city, district}) => {
    const router = useRouter();

    const { t } = useTranslation('common');

    const { pharmacies, setPharmacies, siteLanguage, currentLocation, setCurrentLocation, currentLocationStatus, setCurrentLocationStatus } = useGlobalContext();

    const [dayOfWeek, setDayOfWeek] = useState<string>();
    const [nextDayOfWeek, setNextDayOfWeek] = useState<string>();
    const [dayOfMonth, setDayOfMonth] = useState<number>();
    const [dutyDateDayOfMonth, setDutyDayOfMonth] = useState<number>();
    const [month, setMonth] = useState<string>();
    const [year, setYear] = useState<number>();
    const [date, setDate] = useState<string>("-");
    const [dutyDate, setDutyDate] = useState<string>("-");

    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);

    const [isCurrentLocationModelOpen, setIsCurrentLocationModelOpen] = useState<boolean>(false);
    const [closestPharmacy, setClosestPharmacy] = useState<TPharmacies | null>();

    const [isPageScrolled, setIsPageScrolled] = useState<boolean>(false);
    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
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
            // Window scroll
            document.getElementById("appContainer")?.addEventListener("scroll", onScroll);

            document.getElementById("appContainer")?.scrollTo(0, 0);

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
                (response: TPharmaciesResponse) => {
                    setPharmacies(response.data);
                    setIsDataLoaded(true);
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
            setPharmacies([]);
        }
    }, [])

    useEffect(() => {
        // Date
        const date = new Date();

        const hours = date.getHours();

        let dayIndex = hours <= 7 ? date.getDay() - 1 : date.getDay();
        dayIndex = dayIndex === -1 ? 6 : dayIndex;

        let nextDayIndex = dayIndex + 1;
        nextDayIndex = nextDayIndex === 7 ? 0 : nextDayIndex;

        let monthDayIndex = hours <= 7 ? date.getDate() - 1 : date.getDate();
        
        const _dayOfWeek = t(Days[dayIndex]);
        const _nextDayOfWeek = t(Days[nextDayIndex]);
        const _dayOfMonth = monthDayIndex;
        const _dutyDayOfMonth = date.getDate();
        const _month = t(Months[date.getMonth()]);
        const _year = date.getFullYear();
        const _date = _dayOfMonth + " " + _month + " " + _year + ", " + _dayOfWeek; 
        const _dutyDate = _dutyDayOfMonth + " " + _month + " " + _year + ", " + _dayOfWeek; 

        setDayOfWeek(_dayOfWeek);
        setNextDayOfWeek(_nextDayOfWeek);
        setDayOfMonth(_dayOfMonth);
        setDutyDayOfMonth(_dutyDayOfMonth);
        setMonth(_month);
        setYear(_year);
        setDate(_date);
        setDutyDate(_dutyDate);
    }, [siteLanguage])

    useEffect(() => {
        if(currentLocation) {
           findClosestPharmacy(currentLocation.latitude, currentLocation.longitude);
        }
    }, [currentLocation])

    useEffect(() => {
        if(window && closestPharmacy) {   
            document.getElementById("appContainer")?.scrollTo(0, 0);
        }
    }, [closestPharmacy])

    useEffect(() => {
        if(hasError) {
            clearAllStorageData();
        }
    }, [hasError])

    const redirectToMap = (latitude: number, longitude: number) => {
        const url = "https://www.google.com/maps/search/?api=1&query=" + latitude + "," + longitude;
        
        window.open(url, "_blank");
    }

    const findClosestPharmacy = (userLat: number = 0, userLng: number = 0) => {    
        let closest = 0;
        let closestPharmacy = null;

        let pharmaciesNew = [];

        for (let item of pharmacies) {
            const location = [item.latitude, item.longitude];
            const lat = userLat - Number(location[0]);
            const lng = userLng - Number(location[1]);

            const distance = Math.sqrt((lat * lat) + (lng * lng));

            const distanceAsKm = findDistanceAsKm(Number(location[0]), Number(location[1]), userLat, userLng);
            item.distance = distanceAsKm;
            pharmaciesNew.push(item);
    
            if (!closest || distance < closest) {
                closest = distance;
                closestPharmacy = item;
            }
        }
    
        setClosestPharmacy(closestPharmacy);  
        
        const pharmaciesSortedBasedOnDistance = pharmaciesNew.sort((a,b) => a.distance! - b.distance!);
        setPharmacies(pharmaciesSortedBasedOnDistance);
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
                    <div className={"transition-all flex items-center justify-center" + (isPageScrolled ? " z-50 fixed left-0 top-0 w-full bg-gradient-whiteToTransparent90deg bg-blur border-b" : " bg-semantic-light border rounded-lg")}>
                        <div className={"flex items-start justify-between max-w-[640px] w-full p-medium shadow-ultra-soft border-solid border-muted-700 bg-transparent"}>
                            <div>
                                <div className="text-heading-medium text-onText-primary">{dutyDate}</div>
                                <div className="text-subheading-xsmall text-primary-700 mt-xsmall capitalize">{city} / {district}</div>
                            </div>

                            <div className="text-onText-secondary cursor-pointer" onClick={() => setIsSettingsModalOpen(true)}>
                                <IconSettings size={22} />
                            </div>
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
                                    key={"pharmacy-" + pharmacy.pharmacyName + pharmacy.phone + pharmacy.latitude}
                                    className={(closestPharmacy && (closestPharmacy.phone === pharmacy.phone)) ? "-order-1" : ""}
                                    >
                                        <div  className="shadow-ultra-soft border border-muted-700 border-solid bg-semantic-light mb-medium rounded-lg">
                                            <div className="flex items-center justify-between p-medium border-b border-solid border-muted-600 text-heading-medium text-onText-primary">
                                                <div className="flex flex-col">
                                                    {pharmacy.pharmacyName.toLocaleUpperCase('tr-TR')} 
                                                    {pharmacy.distance && <div className="mt-xsmall text-subheading-xsmall text-onText-secondary">≈ {pharmacy.distance.toFixed(1)}km</div>}
                                                </div>
                                                
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

                                            <div className="px-medium py-medium">
                                                <div className="text-body-small text-onText-secondary">{pharmacy.address}</div>
                                                {pharmacy.directions && <div className="text-subheading-xsmall text-onText-subdark mt-xsmall italic">{pharmacy.directions}</div>}
                                                
                                                <div className="flex items-center gap-xsmall mt-large"> 
                                                    <div className="inline-flex text-primary-400 -translate-y-[1px]">
                                                        <IconPhone size={18} />
                                                    </div>

                                                    <a href={"tel:" + pharmacy.phone} className="block text-subheading-medium text-onText-subdark underline">{pharmacy.phone}</a>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-end gap-medium p-medium mt-small">
                                                <Button type="secondary" text={t("seeOnMap")} Icon={IconMapUp} onClick={() => redirectToMap(pharmacy.latitude, pharmacy.longitude)} />
                                                
                                                <a href={"tel:" + pharmacy.phone}>
                                                    <Button type="primary-light" Icon={IconPhoneCall} />
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
                            <ErrorPage />
                            :
                            <>
                                {
                                    isDataLoaded ?
                                    <div className="flex gap-medium items-center mt-large text-gray-400 text-heading-large">
                                        <div className="-translate-y-[1px]"><IconReportOff size={24} /></div>
                                        {t("noResult")}
                                    </div>
                                    :
                                    <Skeletton />
                                }
                            </>
                            }
                            </>
                        }
                        </>
                    </div>
                </div>
            </div>

            {
                isDataLoaded &&
                <>
                <div className="z-20 fixed bottom-[40px] left-[50%] -translate-x-[50%] inline-flex items-center justify-center gap-medium">
                    {currentLocationStatus !== "granted" && <Button type="rounded" Icon={IconCurrentLocation} className="capitalize" onClick={() => setIsCurrentLocationModelOpen(true)} />}
                    <Button type="primary" text={district} Icon={IconAdjustmentsHorizontal} className="capitalize" isLoading={isFilterButtonLoading} onClick={openFilters} />
                </div>

                <div className="fixed left-0 bottom-0 block w-full h-[164px] bg-gradient-whiteToBlack pointer-events-none"></div>
                </>
            }

            { isCurrentLocationModelOpen && <LocationPermissionModal setIsOpen={setIsCurrentLocationModelOpen} /> }

            <SettingsModal isOpen={isSettingsModalOpen} setIsOpen={setIsSettingsModalOpen} />
        </>
    )
}

export default PharmaciesList;