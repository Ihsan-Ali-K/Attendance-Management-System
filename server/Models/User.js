import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
    
  },
  profilePicture: {
    type: String,
    default: ''
  },
  profileDetails: {
    type: Map,
    of: String
  }
}, {
  timestamps: true
});
export default mongoose.model("User",userSchema)


