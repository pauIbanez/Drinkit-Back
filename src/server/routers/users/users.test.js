require("dotenv").config();
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
  User.create(
    generateUser(
      name,
      lastName,
      "someemail@some.email",
      "someusername",
      password
    )
  );
});

afterEach(async () => {
  await User.deleteMany({});
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
        username: "someusername",
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
