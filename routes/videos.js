import express from "express";
import { verifyToken } from "../verifyToken.js";
import { addVideo, addView, deleteVideo, getByTag, getVideo, random,  search,  sub, trending, updateVideo } from "../controllers/video.js";


const router = express.Router();

// create a video

router.post("/", verifyToken, addVideo)
router.put("/:id", verifyToken, updateVideo)
router.delete("/:id", verifyToken, deleteVideo)
router.get("/find/:id", getVideo)
router.put("/view/:id", addView)
router.get("/trending", trending)
router.get("/random", random)
router.get("/sub", verifyToken, sub)
router.get("/tags", getByTag)
router.get("/search", search)

export default router;