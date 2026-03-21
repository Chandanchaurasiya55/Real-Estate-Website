import User from '../Models/userAuth.Model.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

// User registration controller
async function registerUser(req, res) {

  const { name, email, password, phone } = req.body;

  const isAlreadyExist = await User.findOne({ email });
  
  if (isAlreadyExist) {
    return res.status(400).json({ 
      message: 'User already exists.' 
    });
  }

  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

  const newUser = await User.create({
    name: name,
    email,
    password: hashedPassword,
    phone,
  });

  const token = jwt.sign({
    id: newUser._id,
    email: newUser.email,
  }, config.jwtSecret, { expiresIn: '1d' });

  return res.cookie("token", token, {
    httpOnly: true,
    secure: false, // true only in HTTPS (production)
    sameSite: "lax",
  }).status(200).json({
    message: 'User registered successfully.',
    token,
    user: {
      id: newUser._id,
      email: newUser.email,
    },
  });
}


// User login controller
async function loginUser(req, res) {

  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(400).json({
      message: 'Invalid email or password.',
    });
  }

  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

  if (hashedPassword !== user.password) {
    return res.status(400).json({
      message: 'Invalid email or password.',
    });
  }

  const token = jwt.sign({
    id: user._id,
    email: user.email,
  }, config.jwtSecret, { expiresIn: '1d' });


  return res.cookie("token", token, {
    httpOnly: true,
    secure: false, // true only in HTTPS (production)
    sameSite: "lax",
  }).status(200).json({
    message: 'Login successful.',
    token,
    user: {
      id: user._id,
      email: user.email,
    },
  });
  
}


export { registerUser, loginUser };

