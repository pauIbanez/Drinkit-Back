require("dotenv").config();
const { MongoMemoryServer } = require("mongodb-memory-server");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const app = require("../..");
const connectToDB = require("../../../database");
const User = require("../../../database/models/User");
const generateUser = require("../../../utils/users/creation/generateUser");

let originalEnv;
let mongoServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionString = mongoServer.getUri();
  originalEnv = { ...process.env };
  process.env.TOKEN_SECRET = "secret";
  await connectToDB(connectionString);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
  process.env = originalEnv;
});

beforeEach(async () => {
  const password = "passguord";
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await User.create({
    _id: "622f00e91e85099995d63b07",
    ...generateUser(
      "naim",
      "lastName",
      "someemail@some.email",
      "username",
      hashedPassword
    ),
    active: true,
  });
});

afterEach(async () => {
  await User.deleteMany({});
  jest.resetAllMocks();
});

describe("Given /accounts/login endpoint", () => {
  describe("When it's passed valid user credentials", () => {
    test("Then it should return 200 and a token", async () => {
      const user = {
        username: "username",
        password: "passguord",
      };
      const {
        body: { token },
      } = await request(app).post("/accounts/login").send(user).expect(200);

      expect(token).toBeTruthy();
    });
  });

  describe("When it's passed invalid data", () => {
    test("Then it should return 400 and an error with message 'Invalid user data'", async () => {
      const user = {
        username: "username",
      };

      const expectedBody = {
        error: true,
        code: 400,
        message: "Invalid user data",
      };
      const { body } = await request(app)
        .post("/accounts/login")
        .send(user)
        .expect(400);

      expect(body).toEqual(expectedBody);
    });
  });

  describe("When it's passed an invalid user", () => {
    test("Then it should return 401 and an error with message 'Incorrect username or password'", async () => {
      const user = {
        username: "username2",
        password: "passguord",
      };

      const expectedBody = {
        error: true,
        code: 401,
        message: "Incorrect username or password",
      };
      const { body } = await request(app)
        .post("/accounts/login")
        .send(user)
        .expect(401);

      expect(body).toEqual(expectedBody);
    });
  });

  describe("When it's passed an invalid password", () => {
    test("Then it should return 401 and an error with message 'Incorrect username or password'", async () => {
      const user = {
        username: "username",
        password: "pass",
      };

      const expectedBody = {
        error: true,
        code: 401,
        message: "Incorrect username or password",
      };
      const { body } = await request(app)
        .post("/accounts/login")
        .send(user)
        .expect(401);

      expect(body).toEqual(expectedBody);
    });
  });
});
