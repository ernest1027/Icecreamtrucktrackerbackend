import {Request, Response, NextFunction} from "express";

// Return response based on response data
export const responseHandler = (responseData: Record<string, any>, request: Request , response: Response, next: NextFunction) => {
    if (responseData.code >=400 ) {
        const responseJSON = {
            status: 0,
            error: responseData.error,
            data: responseData.data
        }
        console.log(responseJSON);
        response.status(responseData.code).json(responseJSON)
    }
     else {
        const responseJSON = {
            status: 1,
            data: responseData.data || {}
        }
        console.log(responseJSON);
        response.status(responseData.code).json(responseJSON)
    }
}

