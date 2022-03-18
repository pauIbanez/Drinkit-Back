const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const request = require("supertest");
const app = require("../..");

const connectToDB = require("../../../database");
const Game = require("../../../database/models/Game");
const Room = require("../../../database/models/Room");
const User = require("../../../database/models/User");
const generateUser = require("../../../utils/users/creation/generateUser");

const name = "nein";
const lastName = "lasname";
const email = "someemail@some.email";
const username = "usernaim";
const password = "passguord";

let token;
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
  const originalEnv = { ...process.env };
  process.env.TOKEN_SECRET = "secret";
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await User.create({
    ...generateUser(name, lastName, email, username, hashedPassword),
    _id: "622a0b309b056758689f06e9",
  });
  const { body } = await request(app)
    .post("/accounts/login")
    .send({ username, password });
  token = body.token;
  await Game.create({
    name: "Somegame",
    drunkness: "high",
    duration: 30,
    minPlayers: 4,
    maxPlayers: 12,
    gameInfo: {
      setup: "ahahhaa",
      howToPlay: "you don't",
    },
    _id: "6229dc199b056758689f06e6",
  });
  await Room.create({
    leader: "622a0b309b056758689f06e8",
    game: "6229dc199b056758689f06e6",
  });
  process.env = originalEnv;
});

afterEach(async () => {
  await User.deleteMany({});
  await Room.deleteMany({});
  await Game.deleteMany({});
});

describe("Given /rooms/list endpoint", () => {
  describe("When it recieves a request ", () => {
    test("Then it should return a list of all rooms with status 200", async () => {
      const { body } = await request(app).get("/rooms/list").expect(200);
      expect(body.rooms).toHaveLength(1);
    });
  });
});

describe("Given /rooms/create endpoint", () => {
  describe("When it recieves a request with a valid room", () => {
    test("Then it should return a status of 201", async () => {
      const originalEnv = { ...process.env };
      process.env.TOKEN_SECRET = "secret";
      const room = {
        game: "6229dc199b056758689f06e6",
      };

      await request(app)
        .post("/rooms/create")
        .set("Authorization", `Bearer ${token}`)
        .send(room)
        .expect(201);
      process.env = originalEnv;
    });
  });

  describe("When it recieves a request with a an invalid room", () => {
    test("Then it should return a status of 400 with error true and a message containing 'game'", async () => {
      const originalEnv = { ...process.env };
      process.env.TOKEN_SECRET = "secret";
      const room = {
        game: "asdasda",
      };
      const expectedError = {
        error: true,
        code: 400,
        message: expect.stringContaining("game"),
      };
      const { body } = await request(app)
        .post("/rooms/create")
        .set("Authorization", `Bearer ${token}`)
        .send(room)
        .expect(400);

      expect(body).toEqual(expectedError);
      process.env = originalEnv;
    });
  });
});
