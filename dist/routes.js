"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const express_1 = __importDefault(require("express"));
exports.Router = express_1.default.Router();
const location_1 = require("./models/location/schemas/location");
const checkUndefinedParam_1 = require("./utils/checkUndefinedParam");
const convertInterface_1 = require("./models/location/interfaces/convertInterface");
const parseFilters_1 = require("./utils/parseFilters");
exports.Router.get("/location/search", (request, response, next) => {
    const locationQueryRequest = request.query;
    console.log("GET REQUEST at /location/search MADE", locationQueryRequest);
    // check for undefined params. Returns error through middleware if unsuccessful.
    const params = ["lat", "lng", "radius"];
    if (checkUndefinedParam_1.checkUndefinedParam(params, locationQueryRequest, next))
        return;
    // Create query object
    let locationQuery = convertInterface_1.formatLocationQuery(locationQueryRequest);
    // add filters to query object
    if (locationQueryRequest.filter !== undefined) {
        locationQuery = Object.assign(Object.assign({}, locationQuery), parseFilters_1.parseFilters(locationQueryRequest.filter));
    }
    // Check if there are invalid filters
    if (locationQuery.filterError)
        return next({
            code: 400, error: locationQuery.filterError, data: {}
        });
    // Query and send response
    location_1.Location.find(locationQuery)
        .then((result) => next({ code: 200, data: result }))
        .catch((e) => {
        next({ code: 400, error: e.error, data: e });
    });
});
exports.Router.post("/location/report", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const locationDataRequest = request.query;
    console.log("POST REQUEST AT /newlocationapi/report MADE", locationDataRequest);
    if (Number(locationDataRequest.startTime) > Number(locationDataRequest.endTime)) {
        let tmp = locationDataRequest.startTime;
        locationDataRequest.startTime = locationDataRequest.endTime;
        locationDataRequest.endTime = tmp;
    }
    if (locationDataRequest.scheduled === false) {
        return location_1.Location.updateOne({ driver_id: Number(locationDataRequest.driver_id), scheduled: false }, convertInterface_1.formatLocationData(locationDataRequest), {
            upsert: true,
            runValidators: true
        }).then(() => {
            next({ code: 201 });
        }).catch(e => {
            next({ code: 400, error: e.message, data: e });
        });
    }
    location_1.Location.create(convertInterface_1.formatLocationData(locationDataRequest)).then(() => {
        next({ code: 201 });
    }).catch(e => {
        next({ code: 400, error: e.message, data: e });
    });
}));
exports.Router.delete("/location/report", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    let id = request.query.id;
    location_1.Location.findByIdAndDelete(id).then(() => {
        next({ code: 201 });
    }).catch(e => {
        next({ code: 400, error: e.message, data: e });
    });
}));
exports.Router.get("/location/searchScheduled", (request, response, next) => {
    const driverId = request.query.driver_id;
    location_1.Location.find({ "driver_id": driverId, scheduled: true })
        .then((result) => next({ code: 200, data: result }))
        .catch((e) => {
        next({ code: 400, error: e.error, data: e });
    });
});
exports.Router.get("/location", (request, response) => {
    console.log("home page request");
    response.send("ok");
});
//# sourceMappingURL=routes.js.map