'use client';

import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

type TPharmacies = {
    name: string,
    dist: string,
    address: string,
    phone: string,
    loc: string
}

interface ContextProps {
    cities: Array<string>,
    setCities: Dispatch<SetStateAction<Array<string>>>,

    districts: string[] | never[],
    setDistricts: Dispatch<SetStateAction<string[]>> | Dispatch<SetStateAction<never[]>>,

    pharmacies: TPharmacies[] | never[],
    setPharmacies: Dispatch<SetStateAction<TPharmacies[]>> | Dispatch<SetStateAction<never[]>>,

    selectedCity: string,
    setSelectedCity: Dispatch<SetStateAction<string>>,

    selectedDistrict: string,
    setSelectedDistrict: Dispatch<SetStateAction<string>>
}

const GlobalContext = createContext<ContextProps>({
    cities: [],
    setCities: (): Array<string> => [""],

    districts: [],
    setDistricts: (): string[] | never[] => [],

    pharmacies: [],
    setPharmacies: (): TPharmacies[] | never[] => [],

    selectedCity: "",
    setSelectedCity: (): string => "",

    selectedDistrict: "",
    setSelectedDistrict: (): string => "",
})

export const GlobalContextProvider : React.FC <{ children: React.ReactNode }> = ({ children }) => {
    const [cities, setCities] = useState([""]);

    const [districts, setDistricts] = useState([]);

    const [pharmacies, setPharmacies] = useState([]);

    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    
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
            setSelectedDistrict 
        }}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);