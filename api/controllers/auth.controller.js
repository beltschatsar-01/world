import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Function to hash passwords
const hashPassword = (password) => bcryptjs.hashSync(password, 10);

// Function to generate JWT token
const generateToken = (userId, expiresIn) => jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn });

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = hashPassword(password);

  try {
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json("User created successfully!!!");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next({ status: 404, message: 'User not found' });
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next({ status: 401, message: 'Incorrect email or password' });
    }

    // Set token expiration for access token (30 minutes) and refresh token (7 days)
    const accessToken = generateToken(validUser._id, '30m');
    const refreshToken = generateToken(validUser._id, '7d');
    const {password:pass, ...rest} = validUser._doc;

    res.cookie('access_token', accessToken, { httpOnly: true, expires: new Date(Date.now() + 30 * 60 * 1000) });
    res.status(200).json(rest);
    //json({ access_token: accessToken, refresh_token: refreshToken });
  } catch (error) {
    next(error);
  }
};









/*import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandeler } from "../utiles/error.js";
import jwt from jsontoken

export const signup = async (req,res,next) => {
const {username, email, password, } = req.body;
const hashedPassword = bcryptjs.hashSync(password,10);
const newUser = new User({username,email, password: hashedPassword});

try {
    await newUser.save();
res.status(201).json("User created successfully!!!")

} catch (error) {
   // next(errorHandeler(550, 'error from the function'));
   next(error);
}
};  

export const signin = async (req,res,next) => {
    const {email,password} = req.body;
    try{
        const validUser = await User.findOne({email});
        if (!validUser) return next (errorHandeler(404,'User not found'));
        const validPassword = bcryptjs.compareSync(password,validUser.password);
        if (!validPassword) return next(errorHandeler(401,'you have entered an incorrect email or password'));
        const token =jwt.sign({id:validUser._id},process.env.JWT_SECRET)
        res.cookie('access_token',token,{httpOnly:true,expires:new Date(Date.now()+24 * 60 * 60 * 1000)});
    }catch(error){
        next(error);
    }
};*/