'use client';

import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

interface ContextProps {
    selectedCity: string,
    setSelectedCity: Dispatch<SetStateAction<string>>,
    selectedDistrict: string,
    setSelectedDistrict: Dispatch<SetStateAction<string>>
}

const GlobalContext = createContext<ContextProps>({
    selectedCity: "",
    setSelectedCity: (): string => "",
    selectedDistrict: "",
    setSelectedDistrict: (): string => "",
})

export const GlobalContextProvider : React.FC <{ children: React.ReactNode }> = ({ children }) => {
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    
    return (
        <GlobalContext.Provider value={{ 
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