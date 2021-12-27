import {mongoose} from "../../../utils/mongoose"
import {LocationData} from "../interfaces/LocationData";
import {pointSchema} from "./point";

const integerValidator = (variableName: string) => {
    return {
        validator: Number.isInteger,
        message: `${variableName} must be an integer`
    };
};

// Schema for location
export const locationSchema = new mongoose.Schema<LocationData>({
    //2dsphere index used for geography query
    location: {
        type: pointSchema,
        index: '2dsphere',
        required: true
    },
    driver_id: {
        type: Number,
        min: [1, "Driver id must be greater than 0"],
        validate: integerValidator("driver_id"),
        required: true
    },
    startTime:{
        type:Date,
        required: true
    },
    endTime:{
        type:Date,
        required:true
    },
    scheduled:{
        type:Boolean,
        required: true

    },
    description:{
        type:String
    }
},{ strict: false });

export const Location = mongoose.model('location', locationSchema)

