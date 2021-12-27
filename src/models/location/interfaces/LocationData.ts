import {Point} from "./Point";

// Data type used to add data to MongoDB
export interface LocationData{
    location: Point,
    driver_id: Number,
    startTime:Number,
    endTime:Number,
    scheduled:Boolean,
    description:String
}