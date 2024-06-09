export const findDistanceAsKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const toRad = (Value: number)  => {
        return Value * Math.PI / 180;
    }

    const R = 8000; // km
    const dLat = toRad(lat2-lat1);
    const dLon = toRad(lon2-lon1);
    const _lat1 = toRad(lat1);
    const _lat2 = toRad(lat2);

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(_lat1) * Math.cos(_lat2); 
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c;

    return d;
}