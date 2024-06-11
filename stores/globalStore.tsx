'use client';

import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

export type TPharmacies = {
    pharmacyName: string,
    dist: string,
    address: string,
    phone: string,
    latitude: number,
    longitude: number,
    closest?: boolean,
    distance?: number,
    directions?: string
}

interface ContextProps {
    cities: Array<string>;
    setCities: Dispatch<SetStateAction<Array<string>>>;

    districts: Array<string>;
    setDistricts: Dispatch<SetStateAction<Array<string>>>;

    pharmacies: TPharmacies[];
    setPharmacies: Dispatch<SetStateAction<Array<TPharmacies>>>;

    selectedCity: string;
    setSelectedCity: Dispatch<SetStateAction<string>>;

    selectedDistrict: string;
    setSelectedDistrict: Dispatch<SetStateAction<string>>;

    siteLanguage: string;
    setSiteLanguage: Dispatch<SetStateAction<string>>;
}

const GlobalContext = createContext<ContextProps>({
    cities: [],
    setCities: (): Array<string> => [],

    districts: [],
    setDistricts: (): Array<string> => [],

    pharmacies: [],
    setPharmacies: () => [],

    selectedCity: "",
    setSelectedCity: (): string => "",

    selectedDistrict: "",
    setSelectedDistrict: (): string => "",

    siteLanguage: "",
    setSiteLanguage: (): string => "",
})

export const GlobalContextProvider : React.FC <{ children: React.ReactNode }> = ({ children }) => {
    const [cities, setCities] = useState<Array<string>>([]);

    const [districts, setDistricts] = useState<Array<string>>([]);

    const [pharmacies, setPharmacies] = useState<Array<TPharmacies>>([]);

    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');

    const [siteLanguage, setSiteLanguage] = useState('tr');
    
    return (
        <GlobalContext.Provider value={{ 
            cities,
            setCities,
            districts,
            setDistricts,
            pharmacies,
            setPharmacies,
            selectedCity, 
            setSelectedCity, 
            selectedDistrict, 
            setSelectedDistrict,
            siteLanguage, 
            setSiteLanguage 
        }}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);