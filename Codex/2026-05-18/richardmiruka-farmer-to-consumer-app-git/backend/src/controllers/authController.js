import { User } from "../models/User.js";
import { AppError } from "../utils/AppError.js";
import { signToken } from "../utils/token.js";

function authResponse(user, token) {
  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      location: user.location
    }
  };
}

export async function register(req, res, next) {
  try {
    const { name, email, password, role, phone, location } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new AppError("Email is already registered", 409);
    }

    const user = await User.create({ name, email, password, role, phone, location });
    const token = signToken(user);

    res.status(201).json(authResponse(user, token));
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      throw new AppError("Invalid email or password", 401);
    }

    const token = signToken(user);
    res.json(authResponse(user, token));
  } catch (error) {
    next(error);
  }
}

export function getMe(req, res) {
  res.json({ user: req.user });
}
