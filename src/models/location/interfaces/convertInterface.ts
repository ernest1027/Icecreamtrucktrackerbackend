import {LocationDataRequest} from "./LocationDataRequest";
import {LocationData} from "./LocationData";
import {LocationQueryRequest} from "./LocationQueryRequest";
import {LocationQuery} from "./LocationQuery";

// Turn LocationDataRequest type into LocationData type
export const formatLocationData = (locationData: LocationDataRequest): LocationData =>{
    return {
        location: {
            type: 'Point',
            coordinates: [locationData.lng, locationData.lat]
        },
        driver_id: Number(locationData.driver_id),
        startTime: Number(locationData.startTime),
        endTime: Number(locationData.endTime),
        scheduled: (locationData.scheduled),
        description: locationData.description
    }
}

// Turn LocationQueryRequest type into LocationQueryRequest type
export const formatLocationQuery = (locationQuery: LocationQueryRequest): LocationQuery => {
    return ({
        location: {
            $near: {
                $maxDistance: locationQuery.radius,
                $geometry: {
                    type: "Point",
                    coordinates: [locationQuery.lng, locationQuery.lat]
                }
            }
        },
        endTime: {
            $gte: Number(locationQuery.time)-300000
        },
        startTime:{
            $lt: Number(locationQuery.time)+300000,
        }
    })
}