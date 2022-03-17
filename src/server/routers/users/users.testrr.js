require("dotenv").config();
const jwt = require("jsonwebtoken");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const app = require("../..");
const connectToDB = require("../../../database");
const User = require("../../../database/models/User");
const generateUser = require("../../../utils/users/creation/generateUser");

const name = "nein";
const lastName = "lasname";
const email = "imail@imail.com";
const username = "usernaim";
const password = "passguord";

let mongoServer;
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
  User.create({
    _id: "622f00e91e85099995d63b07",
    ...generateUser(
      name,
      lastName,
      "someemail@some.email",
      "username",
      password
    ),
    active: false,
    activationToken: "token",
  });

  User.create({
    _id: "622f00e91e85099995d63b04",
    ...generateUser(
      name,
      lastName,
      "sadasd@some.email",
      "useusernameusernamername",
      password
    ),
    active: true,
  });
});

afterEach(async () => {
  await User.deleteMany({});
  jest.resetAllMocks();
});

describe("Given /accounts/register endpoint", () => {
  describe("When it recieves a request with all valid data", () => {
    test("Then it should return a status of 201", async () => {
      const body = {
        name,
        lastName,
        email,
        username,
        password,
      };

      await request(app).post("/accounts/register").send(body).expect(201);
    });
  });

  describe("When it recieves a request with invalid data", () => {
    test("Then it should return a status of 400", async () => {
      const body = {
        name,
        lastName,

        password,
      };
      await request(app).post("/accounts/register").send(body).expect(400);
    });
  });

  describe("When it recieves a request with valid data but the username is repeated", () => {
    test("Then it should return a status of 409 and an erro with the message 'username'", async () => {
      const body = {
        name,
        lastName,
        email,
        username: "username",
        password,
      };
      const expectedMessage = "username";

      const {
        body: { message },
      } = await request(app).post("/accounts/register").send(body).expect(409);

      expect(message).toBe(expectedMessage);
    });
  });
});

describe("Given /accounts/activate/:activationToken endpoint", () => {
  describe("When it recieves a valid token and everything is ok", () => {
    test("Then it should return a 200 status and activate the user in the database", async () => {
      jwt.verify = jest
        .fn()
        .mockReturnValue({ id: "622f00e91e85099995d63b07" });
      await request(app).get("/accounts/activate/token").expect(200);

      const foundUser = await User.findById("622f00e91e85099995d63b07");

      expect(foundUser.active).toBe(true);
      expect(foundUser.activationToken).toBe(undefined);
    });
  });

  describe("When it recieves a valid token and the user is not found", () => {
    test("Then it should return a 404 status and message 'User not found'", async () => {
      const expectedMessage = "User not found";

      jwt.verify = jest
        .fn()
        .mockReturnValue({ id: "622f00e91e85099995d63b06" });
      const {
        body: { message },
      } = await request(app).get("/accounts/activate/token").expect(404);

      expect(message).toBe(expectedMessage);
    });
  });

  describe("When it recieves a valid token and the user is already activated", () => {
    test("Then it should return a 400 status and message 'This user is already activated'", async () => {
      const expectedMessage = "This user is already activated";

      jwt.verify = jest
        .fn()
        .mockReturnValue({ id: "622f00e91e85099995d63b04" });
      const {
        body: { message },
      } = await request(app).get("/accounts/activate/token").expect(400);

      expect(message).toBe(expectedMessage);
    });
  });

  describe("When it recieves an invalid token", () => {
    test("Then it should return a 400 status and message 'Invalid activation token'", async () => {
      const expectedMessage = "Invalid activation token";

      const {
        body: { message },
      } = await request(app).get("/accounts/activate/token").expect(400);

      expect(message).toBe(expectedMessage);
    });
  });
});
