import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";
import { User } from "../models/User.js";

export async function protect(req, res, next) {
  try {
    const header = req.headers.authorization;

    if (!header?.startsWith("Bearer ")) {
      throw new AppError("Authentication token is required", 401);
    }

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      throw new AppError("User no longer exists", 401);
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

export function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You do not have permission for this action", 403));
    }

    next();
  };
}
