"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatLocationQuery = exports.formatLocationData = void 0;
// Turn LocationDataRequest type into LocationData type
const formatLocationData = (locationData) => {
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
    };
};
exports.formatLocationData = formatLocationData;
// Turn LocationQueryRequest type into LocationQueryRequest type
const formatLocationQuery = (locationQuery) => {
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
            $gte: Number(locationQuery.time) - 300000
        },
        startTime: {
            $lt: Number(locationQuery.time) + 300000,
        }
    });
};
exports.formatLocationQuery = formatLocationQuery;
//# sourceMappingURL=convertInterface.js.map