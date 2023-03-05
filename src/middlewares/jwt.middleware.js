import jwt from "jsonwebtoken";

export function authToken(req, res, next) {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) res.status(403).send("Error de autorización");
    const token = authHeader.split(" ")[1];
    const isValid = jwt.verify(token, process.env.SECRET);
    if (isValid) {
      req.user = isValid.user;
      next();
    }
    res.status(403).send("Error de autorización");
  } catch (error) {
    throw new Error(error.message);
  }
}
