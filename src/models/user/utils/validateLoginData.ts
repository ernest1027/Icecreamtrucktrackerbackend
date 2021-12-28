import { LoginData } from "../interfaces/LoginData";
import Validator from "validator";
import isEmpty from "is-empty";

export const validateLoginData = async (data: LoginData) => {
    let errors = {}

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    errors = await validateEmail(data.email,errors)
    errors = validatePassword(data.password,errors)

    return {
        errors,
        isValid: isEmpty(errors)
    };

}

async function validateEmail(email:string, errors:Record<string,string>){
    if (Validator.isEmpty(email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(email)) {
        errors.email = "Email is invalid";
    }
    return errors
}

function validatePassword(pass:string, errors:Record<string,string>){
    if (Validator.isEmpty(pass)) {
        errors.password = "Password field is required";
    }
    return errors
}