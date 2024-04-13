import mongoose from "mongoose"

const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: "lastName",
  },
  location: {
    type: String,
    default: "Dhaka",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
})

UserSchema.methods.toJSON = function () {
  var obj = this.toObject()
  delete obj.password
  return obj
}

export default mongoose.model("User", UserSchema)
