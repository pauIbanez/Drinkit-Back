/* eslint-disable lines-between-class-members */
const debug = require("debug")("drinkit:piramide lobby state");
const chalk = require("chalk");
const {
  piramideResponseTypes,
  piramideRequestTypes,
} = require("./piramideLobbyMessageTypes");

class PiramideLobby {
  ready = false;

  id;
  sharedId;

  leader;
  connectedPlayers = [];

  minPlayers;
  maxPlayers;
  availableSlots;

  twoDecks;
  jokers;
  leftovers;
  modifiers = [];

  constructor(lobbyConfig, leader, reference) {
    this.id = reference.id;
    this.sharedId = reference.sharedId;
    this.leader = leader;

    this.setupLobby(lobbyConfig);
  }

  setupLobby(lobbyConfig) {
    if (this.ready) {
      throw new Error("Lobby is already set up!");
    }

    this.minPlayers = lobbyConfig.twoDecks ? 7 : 4;
    this.maxPlayers = lobbyConfig.twoDecks ? 12 : 7;
    this.availableSlots = this.maxPlayers - this.connectedPlayers.length;

    this.jokers = lobbyConfig.jokers;
    this.twoDecks = lobbyConfig.twoDecks;
    this.leftovers = lobbyConfig.leftovers;
    this.modifiers = lobbyConfig.modifiers;
    this.ready = true;

    debug(
      chalk.yellowBright(
        `Lobby created by ${this.leader.profile.username} | ID: ${this.sharedId} - ${this.id}`
      )
    );
  }

  appendPlayer(player) {
    this.connectedPlayers.push(player);
    debug(
      chalk.yellowBright(
        `Player ${player.profile.username} joined lobby ${this.id}`
      )
    );
    this.sendMessage({ type: piramideResponseTypes.sendState });
  }

  removePlayer(id) {
    const foundPlayer = this.connectedPlayers.find(
      (player) => player.id === id
    );

    this.connectedPlayers = this.connectedPlayers.filter(
      (player) => player.id !== id
    );
    debug(
      chalk.yellowBright(
        `Player ${foundPlayer.profile.username} left lobby ${this.id}`
      )
    );
    this.sendMessage({ type: piramideResponseTypes.sendState });
  }

  toggleDecks() {
    this.twoDecks = !this.twoDecks;
  }

  toggleJokers() {
    this.jokers = !this.jokers;
  }

  toggleLeftovers() {
    this.leftovers = !this.leftovers;
  }

  addModifier(modifierId) {
    if (this.modifiers.includes(modifierId)) {
      throw new Error("Lobby already contains this modifier");
    }

    this.modifiers.push(modifierId);
  }

  removeModifier(modifierId) {
    if (!this.modifiers.includes(modifierId)) {
      throw new Error("Cannot remove missing modifier");
    }

    this.modifiers = this.modifiers.filter(
      (modifier) => modifier !== modifierId
    );
  }

  recieveMessage(request) {
    switch (request.type) {
      case piramideRequestTypes.toggleTwoDecks:
        this.toggleDecks();
        break;

      case piramideRequestTypes.toggleJokers:
        this.toggleJokers();
        break;

      case piramideRequestTypes.toggleLeftovers:
        this.toggleLeftovers();
        break;

      case piramideRequestTypes.addModifier:
        this.addModifier(request.modifierId);
        break;

      case piramideRequestTypes.removeModifier:
        this.removeModifier(request.modifierId);
        break;
      default:
        return;
    }

    this.sendMessage({ type: piramideResponseTypes.sendState });
  }

  getState() {
    return {
      leader: this.leader,
      connectedPlayers: this.connectedPlayers.map((player) => ({
        ...player,
        connection: undefined,
      })),

      minPlayers: this.minPlayers,
      maxPlayers: this.maxPlayers,

      twoDecks: this.twoDecks,
      jokers: this.jokers,
      leftovers: this.leftovers,
      modifiers: this.modifiers,
      sharedId: this.sharedId,
    };
  }

  sendMessage(message) {
    switch (message.type) {
      case piramideResponseTypes.sendState:
        this.connectedPlayers.forEach(({ connection }) => {
          connection.send(JSON.stringify(this.getState()));
        });
        break;

      default:
        debug(
          chalk.redBright(
            `An error has occured in room ${this.id}: Unknown response type`
          )
        );
        break;
    }
  }
}

module.exports = PiramideLobby;
