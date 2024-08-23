import Attendance from "../Models/Attendance.js";

export const getReports = async (req, res) => {

    try {
        const { reportType, date, month, userId } = req.body;
        let report;

        switch (reportType) {
            case 'daily':
                report = await getDailyAttendanceReport(date);
                break;
            case 'monthly':
                report = await getMonthlyAttendanceReport(month);
                break;
            case 'user':
                report = await getUserAttendanceReport(userId);
                break;
            case 'absence':
                report = await getAbsenceReport();
                break;
            case 'summary':
                report = await getSummaryReport(month);
                break;
            default:
                return res.status(400).json({ message: "Invalid report type" });
        }
        res.status(200).json(report)

    } catch (error) {
        console.error("Error generating report: ", error);
        res.status(500).json({ message: "Internal server error" });

    }
}

const getDailyAttendanceReport= async (date)=>{
    if(!date) throw new Error("date is required for daily reports")
        const attendance = await Attendance.find({date: new Date(date)}).populate('userId', 'name');
    return attendance;
}

const getMonthlyAttendanceReport = async (month) =>{
    if(!month) throw new Error("month is required for monthly report")
        const startDate = new Date(month + '-01');
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth+1, 0)
    const attendance = await Attendance.find({date: {$gte: startDate, $lte: endDate}}).populate('userId', 'name');
    return attendance;
}

const getUserAttendanceReport = async (userId) => {
    if (!userId) throw new Error("User ID is required for user report");

    const attendance = await Attendance.find({ userId }).populate('userId', 'name');
    return attendance;
};
const getAbsenceReport = async () => {
    const absences = await Attendance.find({ status: 'absent' }).populate('userId', 'name');
    return absences;
};

const getSummaryReport = async () => {
    const presentCount = await Attendance.countDocuments({ status: 'present' });
    const absentCount = await Attendance.countDocuments({ status: 'absent' });
    const lateCount = await Attendance.countDocuments({ status: 'late' });

    return {
        present: presentCount,
        absent: absentCount,
        late: lateCount
    };
};