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
});
