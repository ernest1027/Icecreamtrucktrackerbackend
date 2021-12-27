"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pointSchema = void 0;
// Schema for GeoJSON
const mongoose_1 = require("../../../utils/mongoose");
exports.pointSchema = new mongoose_1.mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    // [lat,lng]
    coordinates: {
        type: [Number],
        required: true
    }
});
//# sourceMappingURL=point.js.map