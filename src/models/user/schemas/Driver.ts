import {mongoose} from "../../../utils/mongoose"
import {Driver} from "../interfaces/Driver";


// Schema for location
export const driverSchema = new mongoose.Schema<Driver>({
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    companyId:{
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
},{ strict: false });

export const DriverModel = mongoose.model<Driver>('driver', driverSchema)

