import { EndPoints, StorageKeys } from "@/enums";

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
        const searchedCity = lastTenCityDistrictsParsed.find((item:{city: string, data: {success: boolean, result: {text: string}}}) => item.city === city);

        if(searchedCity) {
            console.log(searchedCity);
            onSuccess && onSuccess(searchedCity.data);

            return;
        }
    }

    fetch(EndPoints.DISTRICTS_ENDPOINT + "?city=" + city)
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            console.log("hehhehe")
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
    fetch(EndPoints.PHARMACIES_ENDPOINT + "?city=" + city + "&district=" + district )
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            onSuccess && onSuccess(data);
        } else {
            onError && onError(data);
        }
    })
}