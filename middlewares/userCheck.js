import jwt from "jsonwebtoken";

export const checkUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: "You are not authorized" })

  const decode = jwt.decode(token, 'secr@1245GSJfs%79et');

  if (!decode) return res.status(401).json({ message: "You are not authorized" })

  req.userId = decode.id;
  req.isAdmin = decode.isAdmin;
  next()

}

export const adminCheck = (req, res, next) => {

  if (!req.isAdmin) return res.status(401).json({
    message: "You are not authorized"
  })
  next();
}