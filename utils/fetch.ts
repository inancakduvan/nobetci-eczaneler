import { EndPoints, StorageKeys, Months } from "@/enums";
import { setDataOfTodaysPharmacies } from "./storage";

export const fetchCities = (onSuccess: Function) => {
    fetch(EndPoints.CITIES_ENDPOINT)
    .then(response => response.json())
    .then(data => {
        onSuccess && onSuccess(data);
    })
}

export const fetchDistricts = (city: string, onSuccess: Function, onError?: Function) => {
    const lastTenCityDistricts = localStorage.getItem(StorageKeys.LAST_TEN_CITY_DISTRICT);

    if(lastTenCityDistricts) {
        const lastTenCityDistrictsParsed = JSON.parse(lastTenCityDistricts);
        const searchedCity = lastTenCityDistrictsParsed.find((item:{city: string}) => item.city === city);

        if(searchedCity) {
            onSuccess && onSuccess(searchedCity.data);

            return;
        }
    }

    fetch(EndPoints.DISTRICTS_ENDPOINT + "?city=" + city)
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            if(lastTenCityDistricts) {
                const newData = [...JSON.parse(lastTenCityDistricts), {
                    city,
                    data
                }];

                if(newData.length > 10) {
                    newData.shift();
                }

                localStorage.setItem(StorageKeys.LAST_TEN_CITY_DISTRICT, JSON.stringify(newData))

            } else {
                localStorage.setItem(StorageKeys.LAST_TEN_CITY_DISTRICT, JSON.stringify([{
                    city,
                    data
                }]));
            }

            onSuccess && onSuccess(data);
        } else {
            onError && onError(data);
        }
    })
}

export const fetchPharmacies = (city: string, district: string, onSuccess: Function, onError?: Function) => {
    const todaysPharmacies = localStorage.getItem(StorageKeys.TODAYS_PHARMACIES);

    if(todaysPharmacies) {
        const todaysPharmaciesParsed = JSON.parse(todaysPharmacies);

        const date = new Date().getTime();

        if(date > Number(todaysPharmaciesParsed.date)) {
            localStorage.removeItem(StorageKeys.TODAYS_PHARMACIES);
        } else {
            const searchedPharmacies = todaysPharmaciesParsed.value.find((item: {state: string}) => item.state === (city + "-" + district));
    
            if(searchedPharmacies) {
                onSuccess && onSuccess(searchedPharmacies.data);
    
                return;
            }
        }
    }

    fetch(EndPoints.PHARMACIES_ENDPOINT + "?city=" + city + "&district=" + district )
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            if(todaysPharmacies) {
                const todaysPharmaciesParsed = JSON.parse(todaysPharmacies);

                const newData = [
                    ...todaysPharmaciesParsed.value,
                    {
                        state: city + "-" + district,
                        data
                    }
                ];

                setDataOfTodaysPharmacies(JSON.stringify(newData));
            } else {
                setDataOfTodaysPharmacies(JSON.stringify([
                    {
                        state: city + "-" + district,
                        data
                    }
                ]));
            }

            onSuccess && onSuccess(data);
        } else {
            onError && onError(data);
        }
    })
}