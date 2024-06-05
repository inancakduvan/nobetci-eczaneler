import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

import useTranslation from "next-translate/useTranslation";
import Fuse from "fuse.js";

import { useGlobalContext } from "@/stores/globalStore";
import { motion } from "framer-motion";

import {IconArrowLeft, IconSearch } from '@tabler/icons-react';

import { EndPoints, StorageKeys } from "@/enums";


type TSelectState = React.FC<{
    stateType: "city" | "district";
}>;

type TDistrictsResponseResult = {
    text: string;
}

type TDistrictsResponse = {
    success: boolean;
    result: TDistrictsResponseResult[];
}

const SelectState: TSelectState = ({stateType}) => {
    const router = useRouter();
    const cityParamater = router.query.city ? router.query.city.toString() : "";
    
    const { t } = useTranslation('common');

    const { CITIES_ENDPOINT, DISTRICTS_ENDPOINT } = EndPoints;
    const { SELECTED_CITY_KEY, SELECTED_DISTRICT_KEY } = StorageKeys;

    const { cities, setCities, districts, setDistricts, selectedCity, setSelectedCity, selectedDistrict, setSelectedDistrict } = useGlobalContext();

    const [isResultsLoading, setIsResultsLoading] = useState<boolean>(false);
    const [searchedResultList, setSearchedResultList] = useState<string[]>([]);
    const [searchedValue, setSearchedValue] = useState<string>("");

    const fuseOptions = {
        threshold: 0.3
    };
    
    const fuse = useMemo(() => {
        const results = stateType === "city" ? cities : districts;
        return new Fuse(results, fuseOptions);
    }, [cities, districts]);

    const searchResults = useMemo(() => {
        return fuse.search(searchedValue);
    }, [fuse, searchedValue]);

    useEffect(() => {
        if(stateType === "city") {
            fetch(CITIES_ENDPOINT)
            .then(response => response.json())
            .then(data => {
                setCities(data);
            })
        }

        if(stateType === "district") {
            if(!selectedCity) {
                setIsResultsLoading(true);

                fetchDistricts(cityParamater, 
                    (data: TDistrictsResponse) => {
                        const result = data.result.map((item) => item.text);
                        
                        setDistricts(result);
                        setIsResultsLoading(false);
                        router.push("/district/" + cityParamater?.toString().toLowerCase());
                    },
                    () => {
                        router.push("/city");
                    }
                )
            }
        }
    }, [])

    useEffect(() => {
        const results = stateType === "city" ? cities : districts;

        if(searchResults.length === 0) {
            setSearchedResultList(results);
        } else {
            const formattedSearchedResultList = searchResults.map((result) => result.item);
            setSearchedResultList(formattedSearchedResultList);
        }
    }, [searchResults])

    useEffect(() => {
        if(stateType === "city") {
            if(selectedCity) {
                if (window) {
                    localStorage.setItem(SELECTED_CITY_KEY, selectedCity);
                }
    
                setIsResultsLoading(true);

                fetchDistricts(selectedCity, 
                    (data: TDistrictsResponse) => {
                        const result = data.result.map((item) => item.text);
                        
                        setDistricts(result);
                        setIsResultsLoading(false);
                        router.push("/district/" + selectedCity.toLowerCase());
                    },
                    () => {
                        router.push("/city");
                    }
                )
            } else {
                router.push("/city");
            }
        }
    }, [selectedCity])

    useEffect(() => {
        if(selectedDistrict) {
            if (window) {
                localStorage.setItem(SELECTED_DISTRICT_KEY, selectedDistrict);
            }

            router.push("/pharmacies/" + (selectedCity.toLowerCase() || cityParamater.toLowerCase()) + "/" + selectedDistrict.toLowerCase());
        }
    }, [selectedDistrict])

    useEffect(() => {
        if(stateType === "city") {
            setSearchedResultList(cities);
        }

        if(stateType === "district") {
            setSearchedResultList(districts);
        }
    }, [cities, districts])

    const setCityAndDistrict = (name: string) => {
        if(stateType === "city") {
            setSelectedCity(name);
        }

        if(stateType === "district") {
            setSelectedDistrict(name);
        }
    }

    const fetchDistricts = (city: string, onSuccess: Function, onError: Function) => {
        fetch(DISTRICTS_ENDPOINT + "?city=" + city)
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                onSuccess(data);
            } else {
                onError(data);
            }
        })
    }

    const goBack = () => {
        setSearchedResultList([]);
        setSelectedCity("");
        localStorage.removeItem(SELECTED_CITY_KEY);
        router.push("/city");
    }

    if(searchedResultList.length === 0) {
        return "";
    }

    return (
        <>
            <div className="z-10 sticky top-0 left-0 w-full bg-muted-400 pb-medium">
                <div className="relative py-large px-medium text-center text-heading-large text-primary-700 bg-semantic-light border border-solid border-muted-light">
                    {stateType === "district" && <div className="absolute left-[16px] top-[50%] translate-y-[-50%] inline-flex text-primary-400"><IconArrowLeft size={24} /></div>}
                    
                    {stateType === "city" ? t("selectCity") : t("selectDistrict")}
                </div>

                <div className="relative mt-medium px-medium">
                    <div className="absolute left-[32px] top-[50%] translate-y-[-50%] inline-flex text-onText-secondary">
                        <IconSearch size={24} />
                    </div>

                    <input onInput={(event) => setSearchedValue((event.target as HTMLInputElement).value)} type="text" placeholder={stateType === "city" ? t("searchCity") : t("searchDistrict")} className="w-full h-[50px] pr-medium pl-[56px] text-primary placeholder:text-onText-secondary text-body-medium bg-muted-500 border border-solid border-muted-700 focus:border-primary-400 outline-none focus:outline-none rounded-lg" />
                </div>
            </div>

            <div className={"relative mt-medium px-medium pb-medium" + (isResultsLoading ? " pointer-events-none" : "")}>
                {searchedResultList && searchedResultList.length > 0 && searchedResultList.map((state, index) => 
                <motion.div 
                    custom={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.04 * index }}
                    key={"city-" + state}
                >
                    <div className="flex items-center justify-between px-medium text-subheading-medium h-[60px] border-b border-solid border-muted-700" 
                        onClick={() => setCityAndDistrict(state)}>
                        {state} 
                        {(stateType === "city" && isResultsLoading && state === selectedCity) && <span className="loader"></span>}
                    </div>
                </motion.div>)}
            </div>
        </>
    )
}

export default SelectState;