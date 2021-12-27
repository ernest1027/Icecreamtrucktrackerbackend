"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUndefinedParam = void 0;
const checkUndefinedParam = (params, request, next) => {
    for (let i of params) {
        if (request[i] === undefined) {
            next({ code: 400, error: `${i} is missing from request`, data: {} });
            return true;
        }
    }
    return false;
};
exports.checkUndefinedParam = checkUndefinedParam;
//# sourceMappingURL=checkUndefinedParam.js.map