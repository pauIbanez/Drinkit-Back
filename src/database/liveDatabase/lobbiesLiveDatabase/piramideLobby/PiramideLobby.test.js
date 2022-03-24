const PiramideLobby = require("./PiramideLobby");

describe("Given PiramideLobby constructor", () => {
  describe("When it's instanciated passing a lobbyConfig, a leader and a reference", () => {
    test("Then it should store the data", () => {
      const lobbyConfig = {
        twoDecks: false,
        jokers: false,
        leftovers: false,
        modifiers: [],
      };
      const reference = {
        id: "id",
        sharedId: "sharedId",
      };

      const leader = {
        id: "leaderId",
        profile: {
          username: "leader",
        },
        connection: {
          send: jest.fn(),
        },
      };

      const piramideLobby = new PiramideLobby(lobbyConfig, leader, reference);

      const expectedLobby = expect.objectContaining({
        ready: true,

        id: reference.id,
        sharedId: reference.sharedId,

        leader,
        connectedPlayers: [],

        minPlayers: 4,
        maxPlayers: 7,

        twoDecks: false,
        jokers: false,
        leftovers: false,
        modifiers: [],
      });

      expect(piramideLobby).toEqual(expectedLobby);
    });
  });

  describe("When it's instanciated passing a lobbyConfig, a leader and a reference but lobby already set up", () => {
    test("Then it should throw an error", () => {
      const lobbyConfig = {
        twoDecks: false,
        jokers: false,
        leftovers: false,
        modifiers: [],
      };
      const reference = {
        id: "id",
        sharedId: "sharedId",
      };

      const leader = {
        id: "leaderId",
        profile: {
          username: "leader",
        },
        connection: {
          send: jest.fn(),
        },
      };

      const expectedMessage = "Lobby is already set up!";

      const piramideLobby = new PiramideLobby(lobbyConfig, leader, reference);

      const mockHandler = jest.fn();

      try {
        piramideLobby.setupLobby(lobbyConfig);
      } catch (error) {
        mockHandler(error);
      }

      expect(mockHandler).toHaveBeenCalledWith(
        expect.objectContaining({ message: expectedMessage })
      );
    });
  });
});
