import express from "express"

export const LoginRouter = express.Router();

import {Customer} from "../models/user/interfaces/Customer";
import {Driver} from "../models/user/interfaces/Driver";
import {LoginData} from "../models/user/interfaces/LoginData";
import {CustomerModel} from "../models/user/schemas/Customer";
import {DriverModel} from "../models/user/schemas/Driver";
import {sha256} from "js-sha256";
import {CustomerRegisterData} from "../models/user/interfaces/CustomerRegisterData";
import {DriverRegisterData} from "../models/user/interfaces/DriverRegisterData";
import {validateRegistrationData} from "../models/user/utils/validateRegistrationData";
import {createCustomer} from "../models/user/utils/createUser";
import {createDriver} from "../models/user/utils/createUser";
import { validateLoginData } from "../models/user/utils/validateLoginData";
import {createAccessToken, createRefreshToken} from "../utils/authentication/jwt";
import { CompanyModel } from "../models/company/schemas/Company";


LoginRouter.post('/register/customer', async (req, res, next) => {
    const customerData: CustomerRegisterData = req.body as unknown as CustomerRegisterData;
    const {errors, isValid} = await validateRegistrationData(customerData, false)
    if (!isValid) {
        return next({
            code: 400,
            error: errors
        });
    }
    createCustomer(customerData)
        .then(() => next({
            code: 200
        }))
        .catch(() => {
            next({
                code: 400
            });
        })
})

LoginRouter.post('/register/driver', async (req, res, next) => {
    const driverData: DriverRegisterData = req.body as unknown as DriverRegisterData;
    const {errors, isValid} = await validateRegistrationData(driverData, true)
    if (!isValid) {
        return next({
            code: 400,
            error: errors
        });
    }
    createDriver(driverData)
        .then(() => next({
            code: 200
        }))
        .catch(() => {
            next({
                code: 400
            });
        })
})

LoginRouter.post('/login/customer', async (req, res, next) => {
    const loginData: LoginData = req.body as unknown as LoginData;
    const {errors, isValid} = await validateLoginData(loginData);
    if (!isValid) {
        next({
            code: 400,
            errors: errors
        });
    }


    const email = loginData.email.toLowerCase()
    const password = loginData.password

    CustomerModel.findOne({email}).then(async (customer) => {
        if (!customer) return next({
            code: 400,
            errors: {
                email: "Email not Found"
            }
        });
        if (sha256(password) === customer.password) {
            const accessToken = await createAccessToken(customer.id, customer.email, false);
            const refreshToken = await createRefreshToken(customer.id, customer.email, customer.password, false)
            next({
                code: 200,
                data: {accessToken, refreshToken}
            });
        }
        next({
            code: 400,
            errors: {
                password: "Incorrect password"
            }
        });
    })
})

LoginRouter.post('/login/driver', async (req, res, next) => {
    const loginData: LoginData = req.body as unknown as LoginData;
    const {errors, isValid} = await validateLoginData(loginData);
    if (!isValid) {
        next({
            code: 400,
            errors: errors
        });
    }


    const email = loginData.email.toLowerCase()
    const password = loginData.password

    DriverModel.findOne({email}).then(async (driver) => {
        if (!driver) return next({
            code: 400,
            errors: {
                email: "Email not Found"
            }
        });
        if (sha256(password) === driver.password) {
            const accessToken = await createAccessToken(driver.id, driver.email, true);
            const refreshToken = await createRefreshToken(driver.id, driver.email, driver.password, true)
            next({
                code: 200,
                data: {accessToken, refreshToken}
            });
        }
        next({
            code: 400,
            errors: {
                password: "Incorrect password"
            }
        });
    })
})