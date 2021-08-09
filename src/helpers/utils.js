import jwt from "jsonwebtoken";

const generateAccessToken = async (data) => {
  return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
};

export { generateAccessToken };