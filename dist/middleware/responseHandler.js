"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseHandler = void 0;
// Return response based on response data
const responseHandler = (responseData, request, response, next) => {
    if (responseData.code >= 400) {
        const responseJSON = {
            status: 0,
            error: responseData.error,
            data: responseData.data
        };
        console.log(responseJSON);
        response.status(responseData.code).json(responseJSON);
    }
    else {
        const responseJSON = {
            status: 1,
            data: responseData.data || {}
        };
        console.log(responseJSON);
        response.status(responseData.code).json(responseJSON);
    }
};
exports.responseHandler = responseHandler;
//# sourceMappingURL=responseHandler.js.map