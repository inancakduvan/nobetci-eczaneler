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
