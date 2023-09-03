import express from "express";
import { deleteHandler, dislikeHandler, getUser, like, subscribe, unsubscribe, updateHandler } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";
// import { verifyToken } from "../verifyToken.js";


const router = express.Router();

// update user
router.put("/:id", verifyToken, updateHandler)

// delete user
router.delete("/:id", verifyToken, deleteHandler)

// get a user
router.get("/find/:id", getUser)

// subscribe a user
router.put("/sub/:id", verifyToken, subscribe)

// unsubscribe a user
router.put("/unsub/:id", verifyToken, unsubscribe)

// like a video
router.put("/like/:videoId", verifyToken, like)

// dislike a video
router.put("/dislike/:videoId", verifyToken, dislikeHandler)


export default router