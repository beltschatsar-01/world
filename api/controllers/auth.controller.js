import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {errorHandler} from '../utiles/error.js'

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
    next (errorHandler(550, 'erro from the function'));
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

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({email:req.body.email})
    if (user){
      const token = jwt.sign.apply(
        {id:user.id},
        process.env.JWT_SECRET
      );
      const {password:pass, ...rest} = user._doc;
      res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User (
        {
          username: req.body.name.split("").join("").toLowerCase()+Math.random().toString(36).slice(-4),
          email: req.body.email,
          password:hashedPassword,
          avatar: req.body.photo
        }
      )
      await newUser.save();
      const token = jwt.sign(
        {id:newUser._id},
        process.env.JWT_SECRET
      )
      const {password:pass, ...rest} = newUser._doc;
      rest.cookie('access_token', token, {httpOnly:true}).status(200).json(rest);
    }
  } catch (error) {
    
  }
}


console.log('hee');


