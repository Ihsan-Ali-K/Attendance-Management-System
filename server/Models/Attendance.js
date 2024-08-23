import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    userId: {
      type: String,
      ref: 'User',
      required: true
    },
   
    date: {
      type: Date,
      default: Date.now,
      required: true
    },
    status: {
      type: String,
      enum: ['present', 'absent'],
      required: true
    }
  }, {
    timestamps: true
  });
  
 
  export default mongoose.model("Attendance",attendanceSchema)

  