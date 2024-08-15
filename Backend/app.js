import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js";

//importing job router in app.js file to see the changes made in it
import jobRouter from "./routes/jobRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import { newsLetterCron } from "./automation/newsLetterCron.js";

const app = express();
config({ path: "./config/config.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL], //here we will give the url of my frontend.
    methods: ["GET", "POST", "PUT", "DELETE"], //Frontend methods that I'll use in backend.
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    // we are using this to get the file that user will upload like resume and coverletter.
    useTempFiles: true,
    tempFileDir: "/temp/", //we can check this code syntax on their website
  })
);

app.use("/api/v1/user", userRouter); //here we are calling the userRoutes.
app.use("/api/v1/job", jobRouter); //here we are calling the jobRoutes.

app.use("/api/v1/application", applicationRouter);

app.get('/', (req, res) => {
  res.send('API is running....');
})

newsLetterCron();
connection(); //here calling to the database and try to connect with database - mongoose.

app.use(errorMiddleware); //to check the errors of the pages.

export default app;
