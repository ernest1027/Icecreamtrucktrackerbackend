import {Request, Response, NextFunction} from "express";

// Return response based on response data
export const VerifyDriverMiddleware = (responseData: Record<string, any>, request: Request , response: Response, next: NextFunction) => {
   if(request.body.user.isDriver)return next();
    response.status(403).send('Invalid Token')
}

