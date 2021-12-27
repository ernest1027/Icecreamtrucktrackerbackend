"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = exports.locationSchema = void 0;
const mongoose_1 = require("../../../utils/mongoose");
const point_1 = require("./point");
const integerValidator = (variableName) => {
    return {
        validator: Number.isInteger,
        message: `${variableName} must be an integer`
    };
};
// Schema for location
exports.locationSchema = new mongoose_1.mongoose.Schema({
    //2dsphere index used for geography query
    location: {
        type: point_1.pointSchema,
        index: '2dsphere',
        required: true
    },
    driver_id: {
        type: Number,
        min: [1, "Driver id must be greater than 0"],
        validate: integerValidator("driver_id"),
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    scheduled: {
        type: Boolean,
        required: true
    },
    description: {
        type: String
    }
}, { strict: false });
exports.Location = mongoose_1.mongoose.model('location', exports.locationSchema);
//# sourceMappingURL=location.js.map