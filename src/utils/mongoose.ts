import mongoose from "mongoose";
import {MONGOURL as url} from "./config";

// Connect to MongoDB
mongoose.connect(url, {
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

export {mongoose}