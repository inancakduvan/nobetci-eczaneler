import { StorageKeys } from "@/types";

export const setDataOfTodaysPharmacies = (value: string) => {
    const dateObject = new Date();
    
    const currentDate = dateObject.setHours(7,0,0);
    const tomorrow = currentDate + (60 * 60 * 24 * 1000);

    const valueParsed = JSON.parse(value);

    const oldData = sessionStorage.getItem(StorageKeys.TODAYS_PHARMACIES);
    const oldDataParsed = oldData ? JSON.parse(oldData) : null;

    const newData = {
        date: oldDataParsed && oldDataParsed.date ? oldDataParsed.date : tomorrow,
        value: valueParsed
    }

    sessionStorage.setItem(StorageKeys.TODAYS_PHARMACIES, JSON.stringify(newData));
}

export const clearAllStorageData = () => {
    localStorage.removeItem(StorageKeys.TODAYS_PHARMACIES);
    localStorage.removeItem(StorageKeys.LAST_TEN_CITY_DISTRICT);
    localStorage.removeItem(StorageKeys.SELECTED_CITY_KEY);
    localStorage.removeItem(StorageKeys.SELECTED_DISTRICT_KEY);
}
