import express from "express";
import { verifyToken } from "../verifyToken.js";
import { addVideo, addView, deleteVideo, getByTag, getVideo, random,  search,  sub, trending, updateVideo } from "../controllers/video.js";


const router = express.Router();

// add a video

router.post("/", verifyToken, addVideo)

// update video
router.put("/:id", verifyToken, updateVideo)

// delete a Video
router.delete("/:id", verifyToken, deleteVideo)

// get a video
router.get("/find/:id", getVideo)

// add views
router.put("/view/:id", addView)

// get trending videos
router.get("/trending", trending)

// getting random videos
router.get("/random", random)

// subscribing a user
router.get("/sub", verifyToken, sub)

// getting videos by tags
router.get("/tags", getByTag)

// searching videos
router.get("/search", search)

export default router;