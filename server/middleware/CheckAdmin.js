
const checkIsAdmin = async (req, res, next) => {
  if (req.user && req.user.isAdmin === 1) {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only" });
  }
};

export default checkIsAdmin;
