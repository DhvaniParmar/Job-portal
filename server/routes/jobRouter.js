import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { postJob, getAllJobs, getASingleJob, getMyJobs, deleteJob  } from "../controllers/jobController.js";

const router = express.Router();

//setting up the routes

router.post("/post", postJob);
router.get("/getall", getAllJobs);
router.get("/getmyjobs", isAuthenticated, getMyJobs);
router.delete("/delete/:id", isAuthenticated, deleteJob);
router.get("/get/:id", isAuthenticated, getASingleJob);


export default router;