require("dotenv").config();
const { MongoMemoryServer } = require("mongodb-memory-server");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const app = require("../../..");
const connectToDB = require("../../../../database");
const User = require("../../../../database/models/User");
const generateUser = require("../../../../utils/users/creation/generateUser");

let originalEnv;
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
  // originalEnv = { ...process.env };
  // process.env.TOKEN_SECRET = "secret";
  await connectToDB(connectionString);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
  // process.env = originalEnv;
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

  const { body } = await request(app)
    .post("/accounts/login")
    .send({ username: user.username, password: user.password });
  token = body.token;
});

afterEach(async () => {
  await User.deleteMany({});
  jest.resetAllMocks();
});

describe("Given /accounts/my-account endpoint", () => {
  describe("When it recieves a request with a valid token", () => {
    test("Then it should return the user data", async () => {
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
    });
  });
});
