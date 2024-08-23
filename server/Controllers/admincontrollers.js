import Attendance from "../Models/Attendance.js";
import User from "../Models/User.js";

//get all users
export const getUsers = async (req, res)=>{
    try {
        const allUsers = await User.find({ role: { $ne: 'admin' } });
        if(!allUsers) return res.status(404).json({message: "no users found"})
            res.status(200).json(allUsers)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
//function to get start and end of today date
const getTodayRange = () =>{
    const start = new Date()
    start.setHours(0, 0, 0, 0);
    const end = new Date()
    end.setHours(23, 59,59,999)
    return {start, end}
}
//get student daily attendance 
export const getCountStudents = async (req, res) =>{
 try {
    const {start, end} = getTodayRange()
    const totalStudents = await User.countDocuments({role: 'student'})
    const presentCount = await Attendance.countDocuments({
        date: {$gte: start, $lt: end},
        status: "present"
    })
    const absentCount = await Attendance.countDocuments({
        date: {$gte: start, $lt: end},
        status: "absent"
    })
    res.json({
        totalStudents,
        present: presentCount,
        absent: absentCount
      });                     
 } catch (error) {
    res.status(500).json({ error: 'Server error' });
 }
}
// get all students numbers
// export const getCountStudents = async (req, res) =>{
//     try {
//         const totalStudents = await User.countDocuments({ role: 'student' });
//         const presentStudents = await Attendance.countDocuments({ status: 'present' });
//         const absentStudents = await Attendance.countDocuments({  status: 'absent' });

//         res.status(200).json({ totalStudents, present: presentStudents, absent: absentStudents });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// }
//update an attendance
export const updateAttendance = async(req, res) =>{
    try {
        const updatedAttendance = await Attendance.findByIdAndUpdate(req.params.id, req.body)
        if (!updatedAttendance) {
            return res.status(404).json({ message: "Attendance record not found" });
        }
        res.status(200).json(updatedAttendance)
    } catch (error) {
        console.error("Error updating attendance: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//delete an attendance 
export const deleteAttendance = async (req, res) =>{
    try {
        const deletedAttendance = await Attendance.findByIdAndDelete(req.params.id);
        if(!deletedAttendance) return res.status(404).json("record not found")
            res.status(200).json("record deleted successfully")
    } catch (error) {
        
    }
}
//get students name and attendances
export const studentAttendances = async (req, res)=>{
   try {
    const users = await User.find({});
    const attendances = await Attendance.find({}).sort('date');
     
    const result = users.map(user=>{
        return{
            username: user.username,
            attendances: attendances.filter(attendance => attendance.userId === user._id.toString())
        }
    })
    res.json(result)
   } catch (error) {
    console.log(error)
   }
}
