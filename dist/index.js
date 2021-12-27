"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = express_1.default();
const routes_1 = require("./routes");
const responseHandler_1 = require("./middleware/responseHandler");
const config_1 = require("./utils/config");
const body_parser_1 = __importDefault(require("body-parser"));
exports.app.use(express_1.default.json());
exports.app.use(body_parser_1.default.urlencoded({ extended: true }));
exports.app.use("/", routes_1.Router);
exports.server = exports.app.listen(config_1.PORT, () => console.log(`server is listening on port ${config_1.PORT}`));
exports.app.use(responseHandler_1.responseHandler);
//# sourceMappingURL=index.js.map