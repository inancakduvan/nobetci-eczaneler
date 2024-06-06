import { EndPoints } from "@/enums";

export const fetchCities = (onSuccess: Function) => {
    fetch(EndPoints.CITIES_ENDPOINT)
    .then(response => response.json())
    .then(data => {
        onSuccess && onSuccess(data);
    })
}

export const fetchDistricts = (city: string, onSuccess: Function, onError?: Function) => {
    fetch(EndPoints.DISTRICTS_ENDPOINT + "?city=" + city)
    .then(response => response.json())
    .then(data => {
        if(data.success) {
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