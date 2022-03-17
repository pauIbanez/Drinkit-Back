require("dotenv").config();
const { MongoMemoryServer } = require("mongodb-memory-server");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const app = require("../..");
const connectToDB = require("../../../database");
const User = require("../../../database/models/User");
const generateUser = require("../../../utils/users/creation/generateUser");

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
  const password = "passguord";
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  User.create({
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

describe("Given /accounts/register endpoint", () => {
  // describe("When it recieves a request with all valid data", () => {
  //   test("Then it should return a status of 201", async () => {
  //     const body = {
  //       name: "name",
  //       lastName: "lastName",
  //       email: "unusedemail@gmail.com",
  //       username: "validuser",
  //       password: "passguord",
  //     };

  //     await request(app).post("/accounts/register").send(body).expect(201);
  //   });
  // });

  describe("When it recieves a request with invalid data", () => {
    test("Then it should return a status of 400", async () => {
      const body = {
        name: "naim",
        lastName: "lastname",
        password: "passguord",
      };
      await request(app).post("/accounts/register").send(body).expect(400);
    });
  });

  describe("When it recieves a request with valid data but the username is repeated", () => {
    test("Then it should return a status of 409 and an erro with the message 'username'", async () => {
      const body = {
        name: "name",
        lastName: "lastName",
        email: "otheremail@gmail.com",
        username: "username",
        password: "passguord",
      };
      const expectedMessage = "username";

      const {
        body: { message },
      } = await request(app).post("/accounts/register").send(body).expect(409);

      expect(message).toBe(expectedMessage);
    });
  });
});
