import {Request, Response, NextFunction} from "express";
import {sha256} from "js-sha256";
import jwt from "jsonwebtoken";
import {Customer} from "../models/user/interfaces/Customer";
import {Driver} from "../models/user/interfaces/Driver";
import {CustomerModel} from "../models/user/schemas/Customer";
import {DriverModel} from "../models/user/schemas/Driver";
import {createAccessToken} from "../utils/authentication/jwt";
import {JWTSECRET as jwtSecret} from "../utils/config";

export const jwtMiddleware = async (request: Request, response: Response, next: NextFunction) => {
    let accessToken = getAccessTokenFromHeader(request);

    try {
        const tokenPayload = jwt.verify(accessToken, jwtSecret);
        request.body.user = tokenPayload;
        next();
    } catch (e) {
        const refreshToken = request.headers.refreshtoken as string;
        try {
            let accessToken = await refreshAccessToken(refreshToken);
            let tokenPayload = jwt.verify(accessToken, jwtSecret);
            request.body.user = tokenPayload;
            request.body.newAccessToken = accessToken;
            next();
        } catch (e) {
            response.status(403).send('Invalid Token')
        }
    }
}

const getAccessTokenFromHeader = (req: Request) => {
    let token = '';
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
        token = req.headers.authorization.split(' ')[1];
    return token;
}

const getUserFromJwt = async (payload: Record<string, any>): Promise<Driver | Customer> => {
    let user
    if (payload.isDriver) {
        await DriverModel.findOne({email: payload.email}).then((driver: Driver) => user = driver)
    } else {
        await CustomerModel.findOne({email: payload.email}).then((customer: Customer) => user = customer)
    }
    return user;
}

const refreshAccessToken = async (refreshToken: string): Promise<string> => {
    const payload = jwt.verify(refreshToken, jwtSecret) as Record<string, any>;
    let user = await getUserFromJwt(payload);
    if (!user) throw new Error
    if (payload.password !== user.password) throw new Error
    return await createAccessToken(user._id, user.email, payload.isDriver);
}