import { User } from "../models/user.model.js";
import { generateHassedPassword, compareHassedPassword }  from "../utils/helper.js";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(200).json({
        status: false,
        message: "User already exists",
        data: "",
      });
    }

    // Hash the password
    const hashedPassword = await generateHassedPassword(password);

    // Create a new user
    const user = await User.create({
      username,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_KEY,
      { expiresIn: "7d" } 
    );

  
    res.status(200)
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", 
        sameSite: "strict",
      })
      .json({
        message: "User created successfully",
        data: user,
        token: token,
        success: true,
      });

  } catch (error) {
    console.error("Error in registerUser:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message, // Show the error message
      success: false,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(200).json({
        status: false,
        message: "user details not found",
        data: "",
      });
    }

    const isValidPassword = await compareHassedPassword(password, user?.password);
        
    if (!isValidPassword) {
      return res.status(200).json({
        status: false,
        message: "Invalid Password",
        data: "",
      });
    }

    const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_KEY
      );
      res.status(200)
      .cookie("accessToken", token, {
          httpOnly: true,  
          secure: false,    
          sameSite: "none",
      })
      .json({
          success: true,
          message: "User Login Successfully",
          data: user,
          token: token,
      });
  
    
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      data: "",
      success: false,
    });
  }
};


const userLogout = async (req, res) => {
  try {
    res.clearCookie("accessToken", { path: "/" }); // Remove the token from cookies
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Logout failed", error: error.message });
  }
};



export { userLogin, registerUser, userLogout };
