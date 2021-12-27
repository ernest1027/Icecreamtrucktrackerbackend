"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoose = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.mongoose = mongoose_1.default;
const config_1 = require("./config");
// Connect to MongoDB
mongoose_1.default.connect(config_1.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then((result) => {
    console.log("connected");
})
    .catch((error) => {
    console.log(error.message);
});
//# sourceMappingURL=mongoose.js.map