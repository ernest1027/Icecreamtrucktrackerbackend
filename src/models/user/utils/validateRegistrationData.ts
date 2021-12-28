import {Customer} from "../interfaces/Customer";
import {Driver} from "../interfaces/Driver";
import { DriverRegisterData } from "../interfaces/DriverRegisterData";
import {CustomerRegisterData} from "../interfaces/CustomerRegisterData";
import { CompanyModel } from "../../company/schemas/Company";
import {Company} from "../../company/interfaces/Company"
import { DriverModel } from "../schemas/Driver";
import { CustomerModel } from "../schemas/Customer";
import Validator from "validator";
import isEmpty from "is-empty";


export const validateRegistrationData = async (data: CustomerRegisterData | DriverRegisterData, isDriver:boolean) => {
    let errors: Record<string, string> = {}
    data = formatRegistrationData(data,isDriver);
    errors = await validateName(data,errors)
    errors = await validateEmail(data.email,errors, isDriver)
    errors = await validatePassword(data.password,data.password2,errors)
    if(isDriver) {
        (data as DriverRegisterData).companyId  = await validateCompanyKey(data as DriverRegisterData)
        if((data as DriverRegisterData).companyId  === undefined) errors.companykey = "invalid company key"
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
}

const formatRegistrationData = (data: CustomerRegisterData|DriverRegisterData, isDriver:boolean ) : CustomerRegisterData|DriverRegisterData=> {
    data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
    data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    if(isDriver) (data as DriverRegisterData).companyId = !isEmpty((data as DriverRegisterData).companyId) ? (data as DriverRegisterData).companyId : "";
    return data
}

const validateName = async (data: CustomerRegisterData | DriverRegisterData,errors: Record<string, string>) =>{
    if (Validator.isEmpty(data.firstname)){
        errors.firstname = "First name field is required";
    }
    if (Validator.isEmpty(data.lastname)){
        errors.lastname = "Last name field is required";
    }
    return errors
}

const validateEmail = async (email: string, errors: Record<string, string>, isDriver:boolean ) =>{
    if (Validator.isEmpty(email)) {
        errors.email = "Email field is required";

    } else if (!Validator.isEmail(email)) {
        errors.email = "Email is invalid";
    }
    else if(isDriver){
        await DriverModel.findOne({email: email})
            .then((driver:Driver) =>{
                if(driver) errors.email = "Email is already used"
            })
    }
    else
    {
        await CustomerModel.findOne({email: email})
            .then((customer:Customer) =>{
                if(customer) errors.email = "Email is already used"
            })
    }
    return errors
}

const validatePassword = (p1: string, p2: string,  errors: Record<string, string>) =>{
    if (Validator.isEmpty(p1)) {
        errors.password = "Password field is required";
    }
    if (Validator.isEmpty(p2)) {
        errors.password2 = "Confirm password field is required";
    }
    if (!Validator.isLength(p1, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }
    if (!Validator.equals(p1, p2)) {
        errors.password2 = "Passwords must match";
    }
    return errors
}

const validateCompanyKey = async (data: DriverRegisterData): Promise<string> =>{
    let ret;
    await CompanyModel.findOne({key: data.companyKey}).then((res)=>{
        if(res!== null)ret = res._id;
    })
    return ret;
}
module.exports = {validateRegistrationData}

