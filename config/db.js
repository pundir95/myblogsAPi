import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectionDb = () => {
    mongoose
        .connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("database is connected ");
        })
        .catch((err) => {
            console.log("Getting Error", err);
        });
}

export default connectionDb