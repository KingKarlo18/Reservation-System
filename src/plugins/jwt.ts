import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "dotenv";
import { NextFunction, Request, Response } from "express";

config();

interface CustomJwtPayload extends JwtPayload {
  userId: string;
  email: string;
  role: string;
}

const key = process.env.ACCESS_TOKEN_SECRET || "123";

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log(" EVO TOKENA: " + token);
  if (!token) {
    return res
      .status(401)
      .json({ message: "Error while splitting token", token: token });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "123", (err, user) => {
    if (err) {
      return res.sendStatus(403).json({ message: "Error" });
    }

    const userWithRole = user as CustomJwtPayload;

    if (userWithRole && userWithRole.user.role == "admin") {
      next();
    } else {
      return res.status(403).json({ message: "FORBIDDEN, You are not admin" });
    }
  });
}
