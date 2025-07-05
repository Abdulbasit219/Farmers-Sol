import jwt from "jsonwebtoken";

const ensureAuthenticated = (req, res, next) => {
  if (!req.cookies || !req.cookies.token) {
    return res.status(403).send({
      success: false,
      message: "Unauthorized: JWT token is required",
    });
  }
  const auth = req.cookies.token;
  try {
    const decoded = jwt.verify(auth, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).send({
      success: false,
      message: "Unauthorized: JWT token is invalid or expired",
    });
  }
};

export default ensureAuthenticated;
