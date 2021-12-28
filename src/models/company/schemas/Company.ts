import {mongoose} from "../../../utils/mongoose"
import {Company} from "../interfaces/Company";


// Schema for location
export const companySchema = new mongoose.Schema<Company>({
    name: {
        type: String,
        require: true
    },
    key: {
        type: String,
        require: true
    },
},{ strict: false });

export const CompanyModel = mongoose.model<Company>('company', companySchema)

