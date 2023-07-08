import express from "express";
import { createBlogsController, getAllBlogsController, getAllUserBlogsController, deleteblogByIdController } from "../controllers/blogContoller.js";
import userAuth from "../middleware/authMiddleware.js";
import singleUpload from "../middleware/multer.js";

const router = express.Router();

router.post("/create-blog", userAuth, singleUpload, createBlogsController);
router.get("/all-blog", userAuth, getAllBlogsController);
router.get("/user-blog", userAuth, getAllUserBlogsController);
router.delete("/delete-blog/:id", userAuth, deleteblogByIdController);


export default router;