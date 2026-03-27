import User from '../Models/userAuth.Model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

// ─────────────────────────────────────────
// Helper: Generate Access + Refresh Tokens
// ─────────────────────────────────────────
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, email: user.email },
    config.jwtSecret,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    config.refreshSecret,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};


// ─────────────────────────────────────────
// Helper: Set Cookies
// ─────────────────────────────────────────
const setAuthCookies = (res, accessToken, refreshToken) => {
  res
    .cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // HTTPS only in prod
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,             // 15 minutes
    })
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,   // 7 days
    });
};


// ─────────────────────────────────────────
// Register User
// ─────────────────────────────────────────
async function registerUser(req, res) {
  try {
    const { name, email, password, phone } = req.body;

    const isAlreadyExist = await User.findOne({ email });
    if (isAlreadyExist) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // bcrypt hash (saltRounds = 12)
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    const { accessToken, refreshToken } = generateTokens(newUser);
    setAuthCookies(res, accessToken, refreshToken);

    return res.status(201).json({
      message: 'User registered successfully.',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
      },
    });

  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}


// ─────────────────────────────────────────
// Login User
// ─────────────────────────────────────────
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // bcrypt compare (automatically handles salt)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const { accessToken, refreshToken } = generateTokens(user);
    setAuthCookies(res, accessToken, refreshToken);

    return res.status(200).json({
      message: 'Login successful.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });

  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}


// ─────────────────────────────────────────
// Refresh Token Controller (Token Rotation)
// Access token expire → verify refresh token
// → issue NEW access + NEW refresh token
// ─────────────────────────────────────────
async function refreshTokenController(req, res) {
  const oldRefreshToken = req.cookies.refreshToken;

  if (!oldRefreshToken) {
    return res.status(401).json({ message: 'No refresh token found. Please login again.' });
  }

  try {
    // Verify the old refresh token
    const decoded = jwt.verify(oldRefreshToken, config.refreshSecret);

    // Make sure user still exists in DB
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found. Please login again.' });
    }

    // 🔄 Rotate: issue brand new access + refresh tokens
    const { accessToken, refreshToken } = generateTokens(user);
    setAuthCookies(res, accessToken, refreshToken);

    return res.status(200).json({
      message: 'Tokens refreshed successfully.',
    });

  } catch (err) {
    // Refresh token expired or tampered → force re-login
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.status(403).json({
      message: 'Session expired. Please login again.',
    });
  }
}


// ─────────────────────────────────────────
// Logout
// ─────────────────────────────────────────
async function getUsers(req, res) {
  try {
    const users = await User.find().select('-password');
    return res.status(200).json({ users });
  } catch (err) {
    console.error('Get users error:', err);
    return res.status(500).json({ message: 'Failed to fetch users' });
  }
}

async function logoutUser(req, res) {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  return res.status(200).json({ message: 'Logged out successfully.' });
}

export { registerUser, loginUser, refreshTokenController, logoutUser, getUsers };