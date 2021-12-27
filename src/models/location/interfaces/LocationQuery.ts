import {Point} from "./Point";

// Data type used to query data from MongoDb
export interface LocationQuery{
    location:{
        $near:{
            $maxDistance:number,
            $geometry: Point
        }
    },
    endTime: {
        $gte: Number
    },
    startTime:{
        $lt: Number
    }
}