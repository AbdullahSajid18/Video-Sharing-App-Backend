import { createError } from "../error.js"
import User from '../models/User.js'
import Video from '../models/Video.js'


// update api

export const updateHandler = async(req,res,next)=> {
  if(req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set:req.body
      },
      {new: true}
      );
      res.status(200).send(updatedUser)
      
    } catch (err) {
      next (err) 
    }

  }else {
    return next(createError(403, "You can only update your account!"))
  }
};

// delete api

export const deleteHandler = async(req,res,next)=> {
  if(req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).send("User has been deleted!")
      
    } catch (err) {
      next (err) 
    }

  }else {
    return next(createError(403, "You can only delete your account!"))
  }

};

// get user

export const getUser = async(req,res,next)=> {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).send(user)
  } catch (err) {
    next(err)
    
  }
}

// subscribe api

export const subscribe = async(req,res,next)=> {
  try {
    await User.findByIdAndUpdate(req.user.id,{
      $push:{subscribedUsers:req.params.id}
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc:{subscribers : 1},
    });
    res.status(200).json("You Subscribed this channel Successfully! 🥳")
  } catch (err) {
    next(err)
    
  };
};

// unsubscribe api

export const unsubscribe = async(req,res,next)=> {
  try {
    await User.findByIdAndUpdate(req.user.id,{
      $pull:{subscribedUsers:req.params.id}
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc:{subscribers : -1},
    });
    res.status(200).json("You unsubscribed this channel 🙁 ")
  } catch (err) {
    next(err)
    
  }
}

// likeHandler Api

export const like = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId,{
      $addToSet:{likes:id},
      $pull:{dislikes:id}
    })
    res.status(200).json("You liked this video Successfully 😊.")
  } catch (err) {
    next(err);
  }
};


// dislikeHandler Api

export const dislikeHandler = async(req,res,next)=> {
  const id = req.user.id;
    const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet:{dislikes:id},
      $pull:{likes:id}
    })

    res.status(200).send("You disiked This Video 😕!")
  } catch (err) {
    next(err)
    
  }
}