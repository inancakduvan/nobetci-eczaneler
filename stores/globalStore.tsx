'use client';

import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

export interface IPharmacies {
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

export interface ICurrentLocation {
    latitude: number;
    longitude: number;
}

interface ContextProps {
    cities: Array<string>;
    setCities: Dispatch<SetStateAction<Array<string>>>;

    districts: Array<string>;
    setDistricts: Dispatch<SetStateAction<Array<string>>>;

    pharmacies: IPharmacies[];
    setPharmacies: Dispatch<SetStateAction<Array<IPharmacies>>>;

    selectedCity: string;
    setSelectedCity: Dispatch<SetStateAction<string>>;

    selectedDistrict: string;
    setSelectedDistrict: Dispatch<SetStateAction<string>>;

    siteLanguage: string;
    setSiteLanguage: Dispatch<SetStateAction<string>>;

    currentLocation: null | ICurrentLocation;
    setCurrentLocation: Dispatch<SetStateAction<ICurrentLocation | null>>;

    currentLocationStatus: string;
    setCurrentLocationStatus: Dispatch<SetStateAction<string>>;
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

    currentLocation: null,
    setCurrentLocation: (): null => null,

    currentLocationStatus: "prompt",
    setCurrentLocationStatus: (): string => "prompt",
})

export const GlobalContextProvider : React.FC <{ children: React.ReactNode }> = ({ children }) => {
    const [cities, setCities] = useState<Array<string>>([]);

    const [districts, setDistricts] = useState<Array<string>>([]);

    const [pharmacies, setPharmacies] = useState<Array<IPharmacies>>([]);

    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');

    const [siteLanguage, setSiteLanguage] = useState('tr');

    const [currentLocation, setCurrentLocation] = useState<ICurrentLocation | null>(null);
    const [currentLocationStatus, setCurrentLocationStatus] = useState("prompt");

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
            setSiteLanguage,
            currentLocation,
            setCurrentLocation,
            currentLocationStatus,
            setCurrentLocationStatus 
        }}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);