import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

import useTranslation from "next-translate/useTranslation";
import Fuse from "fuse.js";

import { useGlobalContext } from "@/stores/globalStore";
import { motion } from "framer-motion";

import {IconArrowLeft, IconReportOff, IconSearch } from '@tabler/icons-react';

import { StorageKeys } from "@/enums";
import { fetchCities, fetchDistricts } from "@/utils/fetch";
import Spinner from "@/elements/Spinner/Spinner";


type TSelectState = React.FC<{
    stateType: "city" | "district";
}>;

type TDistrictsResponseResult = {
    cities: string;
    slug: string;
}

type TDistrictsResponse = {
    success: boolean;
    data: TDistrictsResponseResult[];
}

const SelectState: TSelectState = ({stateType}) => {
    const router = useRouter();
    const cityParamater = router.query.city ? router.query.city.toString() : "";
    
    const { t } = useTranslation('common');

    const { SELECTED_CITY_KEY, SELECTED_DISTRICT_KEY } = StorageKeys;

    const { cities, setCities, districts, setDistricts, selectedCity, setSelectedCity, selectedDistrict, setSelectedDistrict } = useGlobalContext();

    const [districtsSlugs, setDistrictsSlugs] = useState<Array<string>>([]);

    const [isResultsLoading, setIsResultsLoading] = useState<boolean>(false);
    const [searchedResultList, setSearchedResultList] = useState<string[]>([]);
    const [searchedValue, setSearchedValue] = useState<string>("");

    const [isComponentLoaded, setIsComponentLoaded] = useState<boolean>(false);

    const fuseOptions = {
        threshold: 0.5
    };
    
    const fuse = useMemo(() => {
        const results = stateType === "city" ? cities : districts;
        return new Fuse(results, fuseOptions);
    }, [cities, districts]);

    const searchResults = useMemo(() => {
        return fuse.search(searchedValue);
    }, [fuse, searchedValue]);

    useEffect(() => {
        setIsComponentLoaded(false);
        setIsResultsLoading(false);
        setSearchedResultList([]);
        
        if(stateType === "city") {
            fetchCities((data: string[]) => {
                setCities(data);

                setIsComponentLoaded(true);
            });
        }

        if(stateType === "district") {
            setIsResultsLoading(true);

            fetchDistricts(cityParamater, 
                (response: TDistrictsResponse) => {
                    const result = response.data.map((item) => item.cities);
                    const slugs = response.data.map((item) => item.slug);
                    
                    setDistricts(result);
                    setDistrictsSlugs(slugs);
                    router.push("/district/" + cityParamater?.toString().toLocaleLowerCase('tr-TR'));

                    setIsResultsLoading(false);

                    setIsComponentLoaded(true);
                },
                () => {
                    router.push("/city");
                    setIsResultsLoading(false);
                }
            )
        }

        return () => {
            setSearchedResultList([]);
        }
    }, [])

    useEffect(() => {
        const results = stateType === "city" ? cities : districts;

        if(searchedValue === "") {
            setSearchedResultList(results);
        } else {
            const formattedSearchedResultList = searchResults.map((result) => result.item);
            setSearchedResultList(formattedSearchedResultList);
        }
    }, [searchResults])

    const setCityAndDistrict = (name: string, slug?: string) => {
        if(stateType === "city") {
            setSelectedCity(name);

            if (window) {
                localStorage.setItem(SELECTED_CITY_KEY, name);
            }

            setIsResultsLoading(true);
            router.push("/district/" + name.toLocaleLowerCase('tr-TR'));
        }

        if(stateType === "district") {
            setSearchedResultList([]);
            localStorage.setItem(SELECTED_DISTRICT_KEY, name);
            setSelectedDistrict(name);
            router.push("/pharmacies/" + (selectedCity.toLocaleLowerCase('tr-TR') || cityParamater.toLocaleLowerCase('tr-TR')) + "/" + slug!.toLocaleLowerCase('tr-TR'));
        }
    }

    const goBack = () => {
        setSearchedResultList([]);
        setSelectedCity("");
        localStorage.removeItem(SELECTED_CITY_KEY);
        router.push("/city");
    }

    return (
        <>
            <div className="z-10 sticky top-0 left-0 w-full bg-muted-400 pb-medium">
                <div className="relative py-large px-medium text-center text-heading-large text-primary-700 bg-semantic-light border border-solid border-muted-light">
                    {stateType === "district" && <div className="absolute left-[16px] top-[50%] translate-y-[-50%] inline-flex text-primary-400 cursor-pointer" onClick={goBack}><IconArrowLeft size={24} /></div>}
                    
                    {stateType === "city" ? t("selectCity") : t("selectDistrict")}
                </div>

                <div className="relative mt-medium px-medium">
                    <div className="absolute left-[32px] top-[50%] translate-y-[-50%] inline-flex text-onText-secondary">
                        <IconSearch size={24} />
                    </div>

                    <input onInput={(event) => setSearchedValue((event.target as HTMLInputElement).value)} type="text" placeholder={stateType === "city" ? t("searchCity") : t("searchDistrict")} className="w-full h-[50px] pr-medium pl-[56px] text-primary placeholder:text-onText-secondary text-body-medium bg-muted-500 border border-solid border-muted-700 focus:border-primary-400 outline-none focus:outline-none rounded-lg" />
                </div>
            </div>

            {
                isComponentLoaded ?
                <div className={"relative mt-medium px-medium pb-medium" + (isResultsLoading ? " pointer-events-none" : "")}>
                    {searchedResultList && searchedResultList.length > 0 ? searchedResultList.map((state, index) => 
                    <motion.div 
                        custom={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.04 * index }}
                        key={"city-" + state}
                        onClick={() => setCityAndDistrict(state, districtsSlugs[index])}>
                        <div className="flex items-center justify-between px-medium text-subheading-medium h-[60px] border-b border-solid border-muted-700 cursor-pointer">
                            {state.toLocaleUpperCase('tr-TR')} 
                            {(isResultsLoading && state === selectedCity) && <Spinner />}
                        </div>
                    </motion.div>)
                    :
                    null
                    }
                </div>
                :
                null
            }
        </>
    )
}

export default SelectState;