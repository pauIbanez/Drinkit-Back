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

describe("Given piramideLobby.appendPlayer", () => {
  describe("When it's instanciated passing a player", () => {
    test("Then it should call all users connection.send and add it to connectedPlayers", () => {
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

      const otherPlayer = {
        id: "otherId",
        profile: {
          username: "sdasda",
        },
        connection: {
          send: jest.fn(),
        },
      };

      const piramideLobby = new PiramideLobby(lobbyConfig, leader, reference);

      piramideLobby.appendPlayer(leader);
      piramideLobby.appendPlayer(otherPlayer);

      expect(leader.connection.send).toHaveBeenCalledTimes(2);
      expect(otherPlayer.connection.send).toHaveBeenCalled();
      expect(piramideLobby.connectedPlayers).toContain(leader);
      expect(piramideLobby.connectedPlayers).toContain(otherPlayer);
    });
  });
});

describe("Given piramideLobby.removePlayer", () => {
  describe("When it's instanciated passing a player id", () => {
    test("Then it should call all users connection.send and remove the player form the list", () => {
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

      const otherPlayer = {
        id: "otherId",
        profile: {
          username: "sdasda",
        },
        connection: {
          send: jest.fn(),
        },
      };

      const piramideLobby = new PiramideLobby(lobbyConfig, leader, reference);

      piramideLobby.appendPlayer(leader);
      piramideLobby.appendPlayer(otherPlayer);

      piramideLobby.removePlayer(otherPlayer.id);

      expect(leader.connection.send).toHaveBeenCalledTimes(3);
      expect(otherPlayer.connection.send).toHaveBeenCalledTimes(1);
    });
  });
});

describe("Given piramideLobby.toggeleDecks", () => {
  describe("When it's instanciated and twoDecks was at flase", () => {
    test("Then twoDecks should be true", () => {
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

      piramideLobby.toggleDecks();

      expect(piramideLobby.twoDecks).toBe(true);
    });
  });
});

describe("Given piramideLobby.toggleJokers", () => {
  describe("When it's instanciated and jokers was at flase", () => {
    test("Then jokers should be true", () => {
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

      piramideLobby.toggleJokers();

      expect(piramideLobby.jokers).toBe(true);
    });
  });
});

describe("Given piramideLobby.toggleLeftovers", () => {
  describe("When it's instanciated and leftovers was at flase", () => {
    test("Then leftovers should be true", () => {
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

      piramideLobby.toggleLeftovers();

      expect(piramideLobby.leftovers).toBe(true);
    });
  });
});
