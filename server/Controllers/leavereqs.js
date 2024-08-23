import LeaveRequest from "../Models/LeaveRequests.js"
import User from "../Models/User.js"
// create leave request
export const createLeaveReq = async (req, res)=>{
    const {userId, startDate, endDate, reason} = req.body;

    try {
        const user =await User.findById(userId)
        if(!user) return res.status(404).json({message: "user not found"})

            const newLeaveReq = await LeaveRequest.findOneAndUpdate({userId},{userId, startDate, endDate, reason},
                {
                    new : true,
                    upsert: true
                }
            )
           
            res.status(200).json(newLeaveReq)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//get all leave requests
export const getallrequests = async (req, res)=>{
    try {
        const leaveRequests = await LeaveRequest.find("userId", "name email")
        res.status(200).json(leaveRequests)
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
}
//get a leave request by an :id
export const getRequest = async (req, res)=>{
    const {userId} = req.params;
    try {
        const leaveRequest = await LeaveRequest.find({userId: userId})
        if(!leaveRequest || leaveRequest.length === 0) return res.status(401).json("no record found")

        res.status(200).json(leaveRequest)
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
}


//delete a leave request
export const deleteRequest = async (req, res)=>{
    const {id} = req.params;
    try {
        const leaveReq = await LeaveRequest.findByIdAndDelete(id)
        if(!leaveReq) return res.status(404).json({message: "request not found"})
            res.status(200).json("request deleted succesfully")
     

    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
}


//approve a leave request by admin
export const approveLeaveReq = async (req, res) =>{
    const leaveReqId = req.params.id;
    try {
        const leaveRequest = await LeaveRequest.findById(leaveReqId)
        if(!leaveRequest) return res.status(404).json({message: "leave request not found"})
            if(leaveRequest.status !== 'pending') {
                return res.status(400).json({message: "only pending request can be approved"})
            }
        leaveRequest.status = "approved"
        await leaveRequest.save()

            res.status(200).json("approved leave request successfully", leaveRequest)
    } catch (error) {
        console.error('Error approving leave request:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}