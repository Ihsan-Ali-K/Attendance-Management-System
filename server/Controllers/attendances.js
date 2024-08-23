import Attendance from "../Models/Attendance.js";

// create attendance
export const createAttendance = async (req, res)=>{
    
    const {userId, date, status} = req.body;

    try {
        const newAttendance = new Attendance({userId, date, status})
        await newAttendance.save();
        res.status(200).json(newAttendance);
        
    } catch (error) {
        res.status(400).json({message: error.message})

        
    }

}

//get all attendance records
export const getAttendance = async (req, res) =>{
   try {
    const attendanceRecords = await Attendance.find()
   res.status(200).json(attendanceRecords)
   } catch (error) {
    res.status(400).json({message: error.message})
   }

}

//get an attendance record by Id
export const getAttendanceById = async(req, res) =>{
    const { userId } = req.params;
  const { startDate, endDate } = req.query;

  try {
    const query = { userId };
    
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const attendanceRecord = await Attendance.find(query);
   
       
        if(!attendanceRecord) return res.status(404).json({message: "record not found"})
            res.status(200).json(attendanceRecord)
    } catch (error) {
    res.status(400).json({message: error.message})
        
    }
}

//delete an attendance record by Id
export const deleteAttendance = async (req, res) =>{
    const {id} = req.params;
    try {
        const deleteAttendanc = await Attendance.findByIdAndDelete(id)
        if(!deleteAttendanc) return res.status(404).json({message: " record could not found"})
            res.status(200).json("record deleted successfully")
    } catch (error) {
    res.status(400).json({message: error.message})
        
    }
}












