export const adminAuth = (req, res, next) => {
  console.log("Admin auth is getting checked");
  const token = "xyz";
  const adminAuthorized = token === "xyz";
  if (!adminAuthorized) {
    res.status(401).send("Unauthorized req");
  } else {
    next();
  }
};
