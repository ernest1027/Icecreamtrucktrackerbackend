import express from "express";
export const app = express();
import {Router} from "./routes";
import {responseHandler} from "./middleware/responseHandler";
import {PORT} from "./utils/config";
import bodyParser from 'body-parser';



app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Router);
export const server = app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
app.use(responseHandler);





