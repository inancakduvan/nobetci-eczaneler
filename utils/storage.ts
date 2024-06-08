import { StorageKeys, Months } from "@/enums";

export const setDataOfTodaysPharmacies = (value: string) => {
    const date = new Date();

    const _dayOfMonth = date.getDate();
    const _month = Months[date.getMonth()];
    const _year = date.getFullYear();
    const _date = _dayOfMonth + " " + _month + " " + _year; 

    const valueParsed = JSON.parse(value);

    const newData = {
        date: _date,
        value: valueParsed
    }

    localStorage.setItem(StorageKeys.TODAYS_PHARMACIES, JSON.stringify(newData));
}
