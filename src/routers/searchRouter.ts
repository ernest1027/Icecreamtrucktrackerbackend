import express from "express"

export const SearchRouter = express.Router();
import {LocationModel} from "../models/location/schemas/location";
import {checkUndefinedParam} from "../models/location/utils/checkUndefinedParam";
import {LocationQueryRequest} from "../models/location/interfaces/LocationQueryRequest";
import {LocationDataRequest} from "../models/location/interfaces/LocationDataRequest";
import {formatLocationData, formatLocationQuery} from "../models/location/interfaces/convertInterface";
import {LocationQuery} from "../models/location/interfaces/LocationQuery";
import {parseFilters} from "../models/location/utils/parseFilters";

SearchRouter.get("/", (request, response, next) => {
    const locationQueryRequest: LocationQueryRequest = request.query as unknown as LocationQueryRequest;
    console.log("GET REQUEST at /location/search MADE", locationQueryRequest);

    // check for undefined params. Returns error through middleware if unsuccessful.
    const params = ["lat", "lng", "radius"];
    if (checkUndefinedParam(params, locationQueryRequest, next)) return;

    // Create query object
    let locationQuery = formatLocationQuery(locationQueryRequest) as LocationQuery & Record<string, any>;

    // add filters to query object
    if (locationQueryRequest.filter !== undefined) {
        locationQuery = {...locationQuery, ...parseFilters(locationQueryRequest.filter)}
    }

    // Check if there are invalid filters
    if (locationQuery.filterError) return next({
        code: 400, error: locationQuery.filterError, data: {}
    })

    // Query and send response
    LocationModel.find(locationQuery)
        .then((result) => next({code: 200, data: result}))
        .catch((e) => {
            next({code: 400, error: e.error, data: e})
        });
})




SearchRouter.get("/scheduled", (request,response,next)=>{
    const driverId: Number = request.query.driver_id as unknown as Number;

    LocationModel.find({"driver_id":driverId, scheduled:true})
        .then((result) => next({code: 200, data:result}))
        .catch((e) => {
            next({code: 400, error: e.error, data: e})
        });
})

