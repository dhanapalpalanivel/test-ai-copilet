const bcrypt = require("bcryptjs");
const { randomUUID } = require("crypto");
const { createAuthToken } = require("../utils/token");
const env = require("../config/env");

const isMemoryProvider = env.dbProvider === "memory";
const User = isMemoryProvider ? null : require("../models/User");
const RegistrationEvent = isMemoryProvider ? null : require("../models/RegistrationEvent");

const memoryUsers = [];
const memoryEvents = [];

function generateId() {
  if (typeof randomUUID === "function") {
    return randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function normalizeEmail(email) {
  return String(email).trim().toLowerCase();
}

async function isEmailTaken(email) {
  const normalizedEmail = normalizeEmail(email);

  if (isMemoryProvider) {
    return memoryUsers.some((user) => user.email === normalizedEmail);
  }

  const user = await User.findOne({ email: normalizedEmail }).lean();
  return Boolean(user);
}

async function logRegistrationEvent(user) {
  if (isMemoryProvider) {
    memoryEvents.push({
      type: "USER_REGISTERED",
      userId: user._id,
      email: user.email,
      createdAt: new Date().toISOString()
    });
    return;
  }

  await RegistrationEvent.create({
    type: "USER_REGISTERED",
    userId: user._id,
    email: user.email
  });
}

function sendConfirmationEmail(email, simulateFailure) {
  if (simulateFailure) {
    return {
      sent: false,
      reason: "Simulated email service failure"
    };
  }

  return {
    sent: true
  };
}

async function createUser({ email, password, simulateEmailFailure }) {
  const normalizedEmail = normalizeEmail(email);
  const passwordHash = await bcrypt.hash(password, 12);

  let user;

  if (isMemoryProvider) {
    user = {
      _id: generateId(),
      email: normalizedEmail,
      passwordHash
    };
    memoryUsers.push(user);
  } else {
    user = await User.create({
      email: normalizedEmail,
      passwordHash
    });
  }

  await logRegistrationEvent(user);

  const emailResult = sendConfirmationEmail(normalizedEmail, simulateEmailFailure);

  return {
    userId: String(user._id),
    email: user.email,
    confirmationEmailSent: emailResult.sent,
    warning: emailResult.sent ? undefined : emailResult.reason
  };
}

async function loginUser({ email, password }) {
  const normalizedEmail = normalizeEmail(email);
  const user = isMemoryProvider
    ? memoryUsers.find((item) => item.email === normalizedEmail) || null
    : await User.findOne({ email: normalizedEmail });

  if (!user) {
    return null;
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) {
    return null;
  }

  return {
    userId: String(user._id),
    email: user.email,
    token: createAuthToken(user._id)
  };
}

module.exports = {
  isEmailTaken,
  createUser,
  loginUser
};
