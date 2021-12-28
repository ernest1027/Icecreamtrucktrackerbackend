import {mongoose} from "../../../utils/mongoose"
import {Customer} from "../interfaces/Customer";


// Schema for location
export const customerSchema = new mongoose.Schema<Customer>({
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
    date: {
        type: Date,
        default: Date.now()
    }
},{ strict: false });

export const CustomerModel = mongoose.model<Customer>('customer', customerSchema)

