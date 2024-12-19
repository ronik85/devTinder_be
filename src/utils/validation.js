const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
    //   } else if (!validator.isEmail(emailId)) {
    // throw new Error("email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

const validateProfileData = (req) => {
  const allowedFields = [
    "firstName",
    "lastName",
    "emailId",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedFields.includes(field)
  );
  return isEditAllowed;
};

const validatePasswordData = (req) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new Error("Both old and new passwords are required");
  }

  if (!validator.isStrongPassword(newPassword)) {
    throw new Error("Please enter a strong password");
  }
};

module.exports = {
  validateSignUpData,
  validateProfileData,
  validatePasswordData,
};
