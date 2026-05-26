const {
  validateRegistrationPayload,
  validateLoginPayload,
  validateEmailFormat,
  validatePasswordPolicy
} = require("../validators/registerValidator");
const userService = require("../services/userService");

async function register(req, res, next) {
  try {
    const payload = validateRegistrationPayload(req.body);

    if (!validateEmailFormat(payload.email)) {
      return res.status(400).json({
        error: "InvalidEmailFormat",
        message: "Please provide a valid email address."
      });
    }

    const policyCheck = validatePasswordPolicy(payload.password);
    if (!policyCheck.valid) {
      return res.status(400).json({
        error: "WeakPassword",
        message: "Password does not meet security policy.",
        details: policyCheck.errors
      });
    }

    const emailInUse = await userService.isEmailTaken(payload.email);
    if (emailInUse) {
      return res.status(409).json({
        error: "EmailAlreadyExists",
        message: "This email is already registered."
      });
    }

    const registrationResult = await userService.createUser({
      email: payload.email,
      password: payload.password,
      simulateEmailFailure: req.query.simulateEmailFailure === "true"
    });

    return res.status(201).json({
      message: "Registration successful.",
      data: registrationResult
    });
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    const payload = validateLoginPayload(req.body);

    if (!validateEmailFormat(payload.email)) {
      return res.status(400).json({
        error: "InvalidEmailFormat",
        message: "Please provide a valid email address."
      });
    }

    const authResult = await userService.loginUser({
      email: payload.email,
      password: payload.password
    });

    if (!authResult) {
      return res.status(401).json({
        error: "InvalidCredentials",
        message: "Email or password is incorrect."
      });
    }

    return res.status(200).json({
      message: "Login successful.",
      data: authResult
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  register,
  login
};
