import User from "../Models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const JWT = process.env.JWT;

export const register = async (req, res) => {

    try {
       
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash });

        await newUser.save();
      
        const token = jwt.sign({ id: newUser._id ,role: newUser.role}, JWT);
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(newUser)

    } catch (err) {
        console.log(err)
    }
}

export const logIn = async (req, res, next) => {

    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.json("users not found")
       
        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        
        if (!isCorrect) return res.json("wrong credentialsss")

            const {password, ...others} = user._doc;

        const token = jwt.sign({ id: user._id ,role: user.role}, JWT);
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(others)
    } catch (error) {

    }
}

// Get the user's profile
export const getUser = async (req, res) => {
    try {
      const userId = req.params.userId;
    
      // Find the user by ID
      const user = await User.findById(userId).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'Usesssr not found' });
      }
  
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };

  // Update the user's profile
export const updateUser = async (req, res) => {
    try {
      const userId = req.user.userId;
      const { email, profilePicture, profileDetails } = req.body;
  
      // Find the user by ID and update
      const user = await User.findByIdAndUpdate(
        userId,
        { email, profilePicture, profileDetails },
        { new: true }
      ).select('-password');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };

  //delete a user

 export const deleteUser = async (req, res) =>{
  const userId = req.params.id
  try {
    const user = await User.findById(userId)
    if(!user) return res.status(404).json({message: "user not found"})
      await User.findByIdAndDelete(userId)
    return res.status(200).json({ message: 'User deleted successfully' });
    
  } catch (error) {
    console.log(error)
  }
 }