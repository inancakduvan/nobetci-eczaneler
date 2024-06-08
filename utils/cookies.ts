import { StorageKeys } from "@/enums";

export const setCookieOfTodaysPharmacies = (value: string) => {
    const now = new Date();
    const expire = new Date();

    expire.setFullYear(now.getFullYear());
    expire.setMonth(now.getMonth());
    expire.setDate(now.getDate()+1);
    expire.setHours(0);
    expire.setMinutes(0);
    expire.setSeconds(0);

    const expires = "expires="+expire.toString();
    
    document.cookie = StorageKeys.TODAYS_PHARMACIES + "=" + value + "; " + expires +"; path=/";
}

export const getCookieOfTodaysPharmacies = () => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${StorageKeys.TODAYS_PHARMACIES}=`);

    if (parts && parts.length === 2) {
        const item = parts.pop();

        if(item) {
            return item.split(';').shift()
        }
    }
}