import express from "express"

export const ReportRouter = express.Router();
import {LocationModel} from "../models/location/schemas/location";
import {checkUndefinedParam} from "../models/location/utils/checkUndefinedParam";
import {LocationQueryRequest} from "../models/location/interfaces/LocationQueryRequest";
import {LocationDataRequest} from "../models/location/interfaces/LocationDataRequest";
import {formatLocationData, formatLocationQuery} from "../models/location/interfaces/convertInterface";
import {LocationQuery} from "../models/location/interfaces/LocationQuery";
import {parseFilters} from "../models/location/utils/parseFilters";

ReportRouter.post("/", async (request, response, next) => {
    request.query.driver_id = request.body.user.id;
    const locationDataRequest: LocationDataRequest = request.query as unknown as LocationDataRequest;
    console.log("POST REQUEST AT /newlocationapi/report MADE", locationDataRequest)

    if (Number(locationDataRequest.startTime) > Number(locationDataRequest.endTime)) {
        let tmp = locationDataRequest.startTime;
        locationDataRequest.startTime = locationDataRequest.endTime;
        locationDataRequest.endTime = tmp;
    }


    if (locationDataRequest.scheduled === false) {
        return LocationModel.updateOne({
            driver_id: Number(locationDataRequest.driver_id),
            scheduled: false
        }, formatLocationData(locationDataRequest), {
            upsert: true,
            runValidators: true
        }).then(() => {
            next({code: 201})
        }).catch(e => {
            next({code: 400, error: e.message, data: e})
        });
    }

    LocationModel.create(formatLocationData(locationDataRequest)).then(() => {
        next({code: 201})
    }).catch(e => {
        next({code: 400, error: e.message, data: e})
    });

})

ReportRouter.delete("/", async (request, response, next) => {
    let id = request.query.id;
    LocationModel.findById(id).then(async (res) => {
        if (res.driver_id != request.body.user.id) throw new Error;
        await LocationModel.findByIdAndDelete(id)
        next({code: 201})
    }).catch(e => {
        next({code: 400, error: e.message, data: e})
    });

})

