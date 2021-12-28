// Data type used for post request input and adding data to Redis
export interface LocationDataRequest {
    lat: number,
    lng: number,
    latitude: number,
    longitude: number,
    startTime:Date,
    endTime:Date,
    scheduled:Boolean,
    description:string
    driver_id: number,
}

