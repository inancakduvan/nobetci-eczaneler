import { StorageKeys } from "@/enums";

export const setDataOfTodaysPharmacies = (value: string) => {
    const date = new Date().setHours(7,0,0);

    const valueParsed = JSON.parse(value);

    const newData = {
        date,
        value: valueParsed
    }

    localStorage.setItem(StorageKeys.TODAYS_PHARMACIES, JSON.stringify(newData));
}
