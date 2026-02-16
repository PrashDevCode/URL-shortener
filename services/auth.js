// const sessionIdToUserIdMap = new Map();
import jwt from "jsonwebtoken";

export function createSession(userId) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
}

export function getUserIdFromSession(token) {
  if (!token) {
    return null;
  }
  return jwt.verify(token, process.env.JWT_SECRET);
}
