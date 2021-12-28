import { sha256 } from "js-sha256";
import { CustomerRegisterData } from "../interfaces/CustomerRegisterData";
import { DriverRegisterData } from "../interfaces/DriverRegisterData";
import { CustomerModel } from "../schemas/Customer";
import { DriverModel } from "../schemas/Driver";

export const createCustomer = (data:CustomerRegisterData)=>{
    let customer = new CustomerModel({
        firstname: data.firstname.toLowerCase(),
        lastname: data.lastname.toLowerCase(),
        email: data.email.toLowerCase(),
        password: sha256(data.password)
    })
    return customer.save();
}
export const createDriver = (data:DriverRegisterData)=>{
    let driver = new DriverModel({
        firstname: data.firstname.toLowerCase(),
        lastname: data.lastname.toLowerCase(),
        email: data.email.toLowerCase(),
        password: sha256(data.password),
        companyId: data.companyId
    })
    return driver.save();
}