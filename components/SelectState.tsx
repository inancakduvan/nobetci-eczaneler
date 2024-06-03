import { constants } from "@/constants";
import { Icon } from "@/elements/Icon";
import { useGlobalContext } from "@/stores/globalStore";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useMemo, useState } from "react";

import Fuse from "fuse.js";

import tailwindConfig from "../tailwind.config";

type TSelectState = React.FC<{
    stateType: string;
}>;

const SelectState: TSelectState = ({stateType}) => {
    const TAILWIND_COLORS = tailwindConfig?.theme?.extend?.colors;
    // @ts-ignore: Unreachable code error
    const COLOR_TEXT_SECONDARY = TAILWIND_COLORS?.onText["secondary"];
    
    const { t } = useTranslation('common');

    const { CITIES_ENDPOINT } = constants;

    const { cities, setCities, districts, setDistricts } = useGlobalContext();

    const [searchedResultList, setSearchedResultList] = useState<string[]>([]);
    const [searchedValue, setSearchedValue] = useState<string>("");

    const fuseOptions = {
        threshold: 0.3
    };
    
    const fuse = useMemo(() => {
        return new Fuse(cities, fuseOptions);
    }, [cities]);

    const searchResults = useMemo(() => {
        return fuse.search(searchedValue);
    }, [fuse, searchedValue]);

    useEffect(() => {
        if(searchResults.length === 0) {
            setSearchedResultList(cities);
        } else {
            const formattedSearchedResultList = searchResults.map((result) => result.item);
            setSearchedResultList(formattedSearchedResultList);
        }
    }, [searchResults])

    useEffect(() => {
        if(stateType === "city") {
            fetch(CITIES_ENDPOINT)
            .then(response => response.json())
            .then(data => {
                setCities(data);
            })
        }
    }, [])

    useEffect(() => {
        if(stateType === "city") {
            setSearchedResultList(cities);
        }
    }, [cities])

    return (
        <>
            <div className="z-10 sticky top-0 left-0 w-full bg-muted-400 pb-medium">
                <div className="py-large px-medium text-center text-heading-large text-primary-700 bg-semantic-light border border-solid border-muted-light">
                    {t("selectCity")}
                </div>

                <div className="relative mt-medium px-medium">
                    <Icon name="search" size={24} stroke={COLOR_TEXT_SECONDARY} className="absolute left-[32px] top-[50%] translate-y-[-50%]" />
                    <input onInput={(event) => setSearchedValue((event.target as HTMLInputElement).value)} type="text" placeholder="Şehir ara..." className="w-full h-[50px] pr-medium pl-[56px] text-primary placeholder:text-onText-secondary text-body-medium bg-muted-500 border border-solid border-muted-700 focus:border-primary-400 outline-none focus:outline-none rounded-lg" />
                </div>
            </div>

            <div className="relative mt-medium px-medium pb-medium">
                {searchedResultList && searchedResultList.length > 0 && searchedResultList.map((city) => <div className="flex items-center px-medium text-subheading-medium h-[60px] border-b border-solid border-muted-700" key={"city-" + city}>
                    {city}
                </div>)}
            </div>
        </>
    )
}

export default SelectState;