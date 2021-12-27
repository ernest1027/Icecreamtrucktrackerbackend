// Schema for GeoJSON
import {mongoose} from "../../../utils/mongoose";
import {Point} from "../interfaces/Point";

export const pointSchema = new mongoose.Schema<Point>({
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

