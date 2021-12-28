import express from "express";
export const app = express();
import {LoginRouter} from "./routers/loginRouter";
import {responseHandler} from "./middleware/responseHandler";
import {PORT} from "./utils/config";
import bodyParser from 'body-parser';
import { jwtMiddleware } from "./middleware/jwtMiddleware";
import { ReportRouter } from "./routers/reportRouter";
import { SearchRouter } from "./routers/searchRouter";
import { VerifyDriverMiddleware } from "./middleware/verifyDriverMiddleware";



app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/authentication", LoginRouter);
app.use("/", jwtMiddleware);
app.use("/search", SearchRouter);
app.use("/report", VerifyDriverMiddleware);
app.use("/report", ReportRouter)
export const server = app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
app.use(responseHandler);





