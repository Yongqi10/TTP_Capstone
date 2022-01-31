module.exports = (req, res, next) => {
  const { u_email, u_password, u_name } = req.body;

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const passwordValidation = (password) => {
    // minimum 8 characters, at least one Uppercase letter and one number
    return password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/);
  };

  if (req.path === "/Register") {
    //check all 3 if is empty
    if (![u_email, u_password, u_name].every(Boolean)) {
      return res.status(401).json("email, password and name can not be empty");
    } else if (!validateEmail(u_email)) {
      return res.json("Invalid Email");
    } else if (!passwordValidation(u_password)) {
      return res.json(
        "password Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
      );
    }
  } else if (req.path === "/Login") {
    if (![u_email, u_password].every(Boolean)) {
      return res.status(401).json("email and password can not be empty");
    }
  }

  next();
};
