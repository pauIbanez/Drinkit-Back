require("dotenv").config();
const { MongoMemoryServer } = require("mongodb-memory-server");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const app = require("../../..");
const connectToDB = require("../../../../database");
const User = require("../../../../database/models/User");
const generateUser = require("../../../../utils/users/creation/generateUser");

let mongoServer;
let token;
const user = {
  name: "name",
  lastName: "Lname",
  email: "imail@gmail.com",
  username: "username",
  password: "passguord",
};

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionString = mongoServer.getUri();

  await connectToDB(connectionString);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);

  await User.create({
    ...generateUser(
      user.name,
      user.lastName,
      user.email,
      user.username,
      hashedPassword
    ),
    active: true,
  });

  const originalEnv = { ...process.env };
  process.env.TOKEN_SECRET = "secret";
  const { body } = await request(app)
    .post("/accounts/login")
    .send({ username: user.username, password: user.password });
  token = body.token;
  process.env = originalEnv;
});

afterEach(async () => {
  await User.deleteMany({});
  jest.resetAllMocks();
});

describe("Given /accounts/my-account endpoint", () => {
  describe("When it recieves a request with a valid token", () => {
    test("Then it should return the user data", async () => {
      const originalEnv = { ...process.env };
      process.env.TOKEN_SECRET = "secret";
      const expectedUserData = expect.objectContaining({
        info: expect.objectContaining({
          name: user.name,
          lastName: user.lastName,
          email: user.email,
        }),
        profile: expect.objectContaining({
          username: user.username,
          friends: [],
          incomingRequests: [],
          stats: expect.objectContaining({
            games: 0,
            sips: 0,
          }),
        }),
        active: true,
        online: false,
        inRoom: false,
      });

      const { body } = await request(app)
        .get("/accounts/my-account")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(body).toEqual(expectedUserData);
      process.env = originalEnv;
    });
  });

  describe("When it recieves a request with an invalid token", () => {
    test("Then it should return an error with code 401 and message 'invalid token'", async () => {
      const expectedError = {
        code: 401,
        error: true,
        message: "Invalid token",
      };

      const { body } = await request(app)
        .get("/accounts/my-account")
        .set("Authorization", `Bearer invalidToken`)
        .expect(401);

      expect(body).toEqual(expectedError);
    });
  });

  describe("When it recieves a request without a token", () => {
    test("Then it should return an error with code 401 and message 'No auth provided'", async () => {
      const expectedError = {
        code: 401,
        error: true,
        message: "No auth provided",
      };

      const { body } = await request(app)
        .get("/accounts/my-account")
        .expect(401);

      expect(body).toEqual(expectedError);
    });
  });
});
