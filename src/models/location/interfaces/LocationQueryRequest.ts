// Data type used for get request input
export interface LocationQueryRequest{
    lat: number,
    lng: number,
    radius: number,
    time: Date,
    filter?: string
}