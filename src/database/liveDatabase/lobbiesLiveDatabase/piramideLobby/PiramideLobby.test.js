const PiramideLobby = require("./PiramideLobby");
const { piramideRequestTypes } = require("./piramideLobbyMessageTypes");

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

describe("Given piramideLobby.addModifier", () => {
  describe("When it's instanciated passing a modifierId", () => {
    test("Then the modifeirs should contain the modifierId", () => {
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

      const modifierId = "id";

      const piramideLobby = new PiramideLobby(lobbyConfig, leader, reference);

      piramideLobby.addModifier(modifierId);

      expect(piramideLobby.modifiers).toContain(modifierId);
    });
  });

  describe("When it's instanciated passing a modifierId that is already in the lobby", () => {
    test("Then the modifeirs should throw an error", () => {
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
      const expectedError = expect.objectContaining({
        message: "Lobby already contains this modifier",
      });
      const modifierId = "id";

      const piramideLobby = new PiramideLobby(lobbyConfig, leader, reference);

      piramideLobby.addModifier(modifierId);

      const mockHandler = jest.fn();
      try {
        piramideLobby.addModifier(modifierId);
      } catch (error) {
        mockHandler(error);
      }

      expect(mockHandler).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given piramideLobby.removeModifier", () => {
  describe("When it's instanciated passing a modifierId", () => {
    test("Then the modifeirs should not contain the modifierId", () => {
      const modifierId = "id";

      const lobbyConfig = {
        twoDecks: false,
        jokers: false,
        leftovers: false,
        modifiers: [modifierId],
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

      piramideLobby.removeModifier(modifierId);

      expect(piramideLobby.modifiers).not.toContain(modifierId);
    });
  });

  describe("When it's instanciated passing a modifierId that is not in the lobby", () => {
    test("Then the modifeirs should throw an error", () => {
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
      const expectedError = expect.objectContaining({
        message: "Cannot remove missing modifier",
      });
      const modifierId = "id";

      const piramideLobby = new PiramideLobby(lobbyConfig, leader, reference);

      const mockHandler = jest.fn();
      try {
        piramideLobby.removeModifier(modifierId);
      } catch (error) {
        mockHandler(error);
      }

      expect(mockHandler).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given piramideLobby.recieveMessage", () => {
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

  let piramideLobby;
  beforeAll(() => {
    piramideLobby = new PiramideLobby(lobbyConfig, leader, reference);
    piramideLobby.appendPlayer(leader);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("When it's instanciated passing a message without a known type", () => {
    test("Then it should should not explode", () => {
      const message = {
        requester: {
          clientId: leader.id,
        },
      };

      piramideLobby.recieveMessage(message);

      expect(leader.connection.send).not.toHaveBeenCalled();
    });
  });

  describe("When it's instanciated passing a message with type toggleDecks", () => {
    test("Then it should should toggle twoDecks", () => {
      const message = {
        type: piramideRequestTypes.toggleTwoDecks,
      };

      piramideLobby.recieveMessage(message);

      expect(piramideLobby.twoDecks).toBe(true);
      expect(leader.connection.send).toHaveBeenCalledTimes(1);
    });
  });

  describe("When it's instanciated passing a message with type toggleJokers", () => {
    test("Then it should should toggle jokers", () => {
      const message = {
        type: piramideRequestTypes.toggleJokers,
      };

      piramideLobby.recieveMessage(message);

      expect(piramideLobby.jokers).toBe(true);
      expect(leader.connection.send).toHaveBeenCalledTimes(1);
    });
  });

  describe("When it's instanciated passing a message with type toggleLeftovers", () => {
    test("Then it should should toggle leftovers", () => {
      const message = {
        type: piramideRequestTypes.toggleLeftovers,
      };

      piramideLobby.recieveMessage(message);

      expect(piramideLobby.jokers).toBe(true);
      expect(leader.connection.send).toHaveBeenCalledTimes(1);
    });
  });

  describe("When it's instanciated passing a message with type addModifier", () => {
    test("Then it should should add the modifier", () => {
      const modifierId = "modifierId";
      const message = {
        type: piramideRequestTypes.addModifier,
        modifierId,
      };

      piramideLobby.recieveMessage(message);

      expect(piramideLobby.modifiers).toContain(modifierId);
      expect(leader.connection.send).toHaveBeenCalledTimes(1);

      piramideLobby.removeModifier(modifierId);
    });
  });

  describe("When it's instanciated passing a message with type removeModifier", () => {
    test("Then it should should remove the modifier", () => {
      const modifierId = "modifierId";
      const message = {
        type: piramideRequestTypes.removeModifier,
        modifierId,
      };

      piramideLobby.addModifier(modifierId);
      piramideLobby.recieveMessage(message);
      expect(piramideLobby.modifiers).not.toContain(modifierId);
      expect(leader.connection.send).toHaveBeenCalledTimes(1);
    });
  });
});

describe("Given piramideLobby.sendMessage", () => {
  const lobbyConfig = {
    twoDecks: true,
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

  let piramideLobby;
  beforeAll(() => {
    piramideLobby = new PiramideLobby(lobbyConfig, leader, reference);
    piramideLobby.appendPlayer(leader);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("When it's instanciated passing a message without a known type", () => {
    test("Then it should should not explode", () => {
      const message = {};

      piramideLobby.sendMessage(message);

      expect(leader.connection.send).not.toHaveBeenCalled();
    });
  });
});
