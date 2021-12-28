// Returns true and sends error message if undefined parameters exist
import {NextFunction} from "express";
export const checkUndefinedParam = (params: (string)[], request: Record<string,any>, next: NextFunction) =>
{
    for (let i of params) {
        if (request[i] === undefined) {
            next({code: 400, error:`${i} is missing from request`, data:{}})
            return true
        }
    }
    return false
}

