import { User } from "../models/user.model.js";
import { generateHassedPassword, compareHassedPassword }  from "../utils/helper.js";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log(username)

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(200).json({
        status: false,
        message: "User already found",
        data: "",
      });
    }

    const hassedPassword = await generateHassedPassword(password);

    const user = await User.create({
      username,
      password: hassedPassword,
    });

    return res.status(200).json({
      message: "user created successfully",
      data: user,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      data: "",
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

export { userLogin, registerUser };
