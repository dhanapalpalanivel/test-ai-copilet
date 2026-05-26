function validateRegistrationPayload(body) {
  if (!body || typeof body !== "object") {
    const error = new Error("Request body is required.");
    error.statusCode = 400;
    throw error;
  }

  const { email, password, confirmPassword } = body;
  const missingFields = [];

  if (!email) {
    missingFields.push("email");
  }
  if (!password) {
    missingFields.push("password");
  }
  if (!confirmPassword) {
    missingFields.push("confirmPassword");
  }

  if (missingFields.length > 0) {
    const error = new Error(`Missing required fields: ${missingFields.join(", ")}`);
    error.statusCode = 400;
    error.code = "MissingFields";
    throw error;
  }

  if (password !== confirmPassword) {
    const error = new Error("Password and confirmation do not match.");
    error.statusCode = 400;
    error.code = "PasswordMismatch";
    throw error;
  }

  return {
    email,
    password,
    confirmPassword
  };
}

function validateLoginPayload(body) {
  if (!body || typeof body !== "object") {
    const error = new Error("Request body is required.");
    error.statusCode = 400;
    throw error;
  }

  const { email, password } = body;
  const missingFields = [];

  if (!email) {
    missingFields.push("email");
  }
  if (!password) {
    missingFields.push("password");
  }

  if (missingFields.length > 0) {
    const error = new Error(`Missing required fields: ${missingFields.join(", ")}`);
    error.statusCode = 400;
    error.code = "MissingFields";
    throw error;
  }

  return {
    email,
    password
  };
}

function validateEmailFormat(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(email).trim());
}

function validatePasswordPolicy(password) {
  const errors = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long.");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must include at least one uppercase letter.");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must include at least one lowercase letter.");
  }
  if (!/\d/.test(password)) {
    errors.push("Password must include at least one number.");
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push("Password must include at least one special character.");
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

module.exports = {
  validateRegistrationPayload,
  validateLoginPayload,
  validateEmailFormat,
  validatePasswordPolicy
};
