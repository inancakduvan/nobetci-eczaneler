'use client';

import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

type TDistricts = {
    text: string
}

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

    districts: Array<TDistricts>,
    setDistricts: Dispatch<SetStateAction<Array<TDistricts>>>,

    pharmacies: Array<TPharmacies>,
    setPharmacies: Dispatch<SetStateAction<Array<TPharmacies>>>,

    selectedCity: string,
    setSelectedCity: Dispatch<SetStateAction<string>>,

    selectedDistrict: string,
    setSelectedDistrict: Dispatch<SetStateAction<string>>
}

const GlobalContext = createContext<ContextProps>({
    cities: [],
    setCities: (): Array<string> => [""],

    districts: [],
    setDistricts: (): Array<TDistricts> => { return [
        {
            text: ""
        }
    ]},

    pharmacies: [],
    setPharmacies: (): Array<TPharmacies> => [{
        "name": "",
        "dist": "KONAK",
        "address": "156 SOK. NO:15 HATAY",
        "phone": "2322430037",
        "loc": "38.402917,27.105986"
    }],

    selectedCity: "",
    setSelectedCity: (): string => "",

    selectedDistrict: "",
    setSelectedDistrict: (): string => "",
})

export const GlobalContextProvider : React.FC <{ children: React.ReactNode }> = ({ children }) => {
    const [cities, setCities] = useState([""]);

    const [districts, setDistricts] = useState([
        {
            text: ""
        }
    ]);

    const [pharmacies, setPharmacies] = useState([{
        "name": "",
        "dist": "KONAK",
        "address": "156 SOK. NO:15 HATAY",
        "phone": "2322430037",
        "loc": "38.402917,27.105986"
    }]);

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