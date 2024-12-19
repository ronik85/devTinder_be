const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/Auth");
const ConnectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName age gender skills";

userRouter.get("/user/requests/recieved", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "age",
      "gender",
      "skills",
    ]);

    return res.json({
      message: "Data fetched successfully",
      data: connectionRequest,
    });
  } catch (error) {
    req.status(400).send("ERROR : " + error.message);
  }
});
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequest.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    return res.json({
      message: "Data fetched successfully",
      data,
    });
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

module.exports = userRouter;
