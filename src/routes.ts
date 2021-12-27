import express from "express"

export const Router = express.Router();
import {Location} from "./models/location/schemas/location";
import {checkUndefinedParam} from "./utils/checkUndefinedParam";
import {LocationQueryRequest} from "./models/location/interfaces/LocationQueryRequest";
import {LocationDataRequest} from "./models/location/interfaces/LocationDataRequest";
import {formatLocationData, formatLocationQuery} from "./models/location/interfaces/convertInterface";
import {LocationQuery} from "./models/location/interfaces/LocationQuery";
import {parseFilters} from "./utils/parseFilters";

Router.get("/location/search", (request, response, next) => {
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
    Location.find(locationQuery)
        .then((result) => next({code: 200, data: result}))
        .catch((e) => {
            next({code: 400, error: e.error, data: e})
        });
})


Router.post("/location/report", async (request, response, next) => {
    const locationDataRequest: LocationDataRequest = request.query as unknown as LocationDataRequest;
    console.log("POST REQUEST AT /newlocationapi/report MADE", locationDataRequest)

    if(Number(locationDataRequest.startTime)>Number(locationDataRequest.endTime)){
        let tmp = locationDataRequest.startTime;
        locationDataRequest.startTime = locationDataRequest.endTime;
        locationDataRequest.endTime = tmp;
    }


    if(locationDataRequest.scheduled===false)
    {
        return Location.updateOne({driver_id: Number(locationDataRequest.driver_id), scheduled: false}, formatLocationData(locationDataRequest), {
            upsert: true,
            runValidators: true
        }).then(()=>{
            next({code: 201})
        }).catch(e => {
            next({code: 400, error: e.message, data: e})
        });
    }

    Location.create(formatLocationData(locationDataRequest)).then(()=>{
        next({code: 201})
    }).catch(e => {
        next({code: 400, error: e.message, data: e})
    });


})

Router.delete("/location/report", async (request,response,next)=> {
    let id = request.query.id;
    Location.findByIdAndDelete(id).then(() => {
        next({code: 201})
    }).catch(e => {
        next({code: 400, error: e.message, data: e})
    });
})

Router.get("/location/searchScheduled", (request,response,next)=>{
    const driverId = request.query.driver_id;

    Location.find({"driver_id":driverId, scheduled:true})
        .then((result) => next({code: 200, data:result}))
        .catch((e) => {
            next({code: 400, error: e.error, data: e})
        });
})


Router.get("/location", (request, response) => {
    console.log("home page request")
    response.send("ok")
})
