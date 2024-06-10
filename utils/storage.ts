import { StorageKeys } from "@/enums";

export const setDataOfTodaysPharmacies = (value: string) => {
    const currentDate = new Date().setHours(7,0,0);
    const tomorrow = currentDate + (60 * 60 * 24 * 1000);

    const valueParsed = JSON.parse(value);

    const newData = {
        date: tomorrow,
        value: valueParsed
    }

    localStorage.setItem(StorageKeys.TODAYS_PHARMACIES, JSON.stringify(newData));
}

export const clearAllStorageData = () => {
    localStorage.removeItem(StorageKeys.TODAYS_PHARMACIES);
    localStorage.removeItem(StorageKeys.LAST_TEN_CITY_DISTRICT);
    localStorage.removeItem(StorageKeys.SELECTED_CITY_KEY);
    localStorage.removeItem(StorageKeys.SELECTED_DISTRICT_KEY);
}
