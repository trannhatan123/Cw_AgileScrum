exports.authorize = (...allowedRoles) => {
  return (req, res, next) => {
    // req.user đã được gán trong authMiddleware
    const userRole = req.user.role;
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Forbidden: insufficient permission' });
    }
    next();
  };
};
