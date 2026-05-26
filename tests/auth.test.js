const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../src/app");
const { connectDB, disconnectDB } = require("../src/config/db");
const User = require("../src/models/User");
const RegistrationEvent = require("../src/models/RegistrationEvent");

describe("Auth API", () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await connectDB(mongoServer.getUri());
  });

  afterEach(async () => {
    await User.deleteMany({});
    await RegistrationEvent.deleteMany({});
  });

  afterAll(async () => {
    await disconnectDB();
    await mongoServer.stop();
  });

  it("registers a user and stores an event", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        email: "user@example.com",
        password: "StrongPass1!",
        confirmPassword: "StrongPass1!"
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.data.email).toBe("user@example.com");

    const userCount = await User.countDocuments();
    const eventCount = await RegistrationEvent.countDocuments();
    expect(userCount).toBe(1);
    expect(eventCount).toBe(1);
  });

  it("rejects duplicate email regardless of case", async () => {
    await request(app).post("/api/auth/register").send({
      email: "user@example.com",
      password: "StrongPass1!",
      confirmPassword: "StrongPass1!"
    });

    const response = await request(app).post("/api/auth/register").send({
      email: "USER@example.com",
      password: "StrongPass1!",
      confirmPassword: "StrongPass1!"
    });

    expect(response.statusCode).toBe(409);
    expect(response.body.error).toBe("EmailAlreadyExists");
  });

  it("logs in and returns a JWT", async () => {
    await request(app).post("/api/auth/register").send({
      email: "login@example.com",
      password: "StrongPass1!",
      confirmPassword: "StrongPass1!"
    });

    const response = await request(app).post("/api/auth/login").send({
      email: "login@example.com",
      password: "StrongPass1!"
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.token).toEqual(expect.any(String));
  });

  it("rejects invalid login credentials", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "nope@example.com",
      password: "WrongPass1!"
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe("InvalidCredentials");
  });
});
