const mongoose = require("mongoose");
const User = require("./user");

const connectionRequestSchema = mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

connectionRequestSchema.pre("save", async function (next) {
  const connectionRequest = this;
  //Check if toUserId  is equal to fromUserId
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw Error("Cannot send connection request to yourself");
  }
  next();
});

const ConnectionRequestModel = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);
module.exports = ConnectionRequestModel;
