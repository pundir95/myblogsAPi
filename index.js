import express from "express"
import cors from "cors"
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectionDb from "./config/db.js"
import authRoute from "./routes/authRoute.js"
import blogRoute from "./routes/blogRoute.js"
import errroMiddelware from "./middleware/errorMiddlware.js";


dotenv.config();
connectionDb()
const app = express();



//config 

const PORT = process.env.PORT || 8080

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/blog", blogRoute);
app.use(errroMiddelware);


app.listen(PORT, () => {
    console.log(`${PORT}`)
})
