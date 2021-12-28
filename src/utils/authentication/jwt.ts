import { sha256 } from "js-sha256";
import jwt from "jsonwebtoken";
import {JWTSECRET as jwtSecret} from "../config";

const EXPIRY_TIME = 15*60;

export const createAccessToken = (id: string, email: string, isDriver:boolean) : string => {
    const type = 'access'
    const payload = {type,id,email,isDriver}
    const accessToken = jwt.sign(
        payload,
        jwtSecret,
        {expiresIn: EXPIRY_TIME}
    );

    return accessToken;
}

export const createRefreshToken = (id: string, email: string, password:string, isDriver:boolean) : string =>{

    const type = 'refresh';
    const payload = {type,id, email, password,isDriver}

    const refreshToken = jwt.sign(
        payload,
        jwtSecret
    );
    return refreshToken;
}
