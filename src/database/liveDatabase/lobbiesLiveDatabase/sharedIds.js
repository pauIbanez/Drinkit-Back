/* eslint-disable no-plusplus */
const availableSharedIds = [];
const takenSharedIds = [];

const makeId = () => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < 4; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result.toUpperCase();
};

const getId = () => {
  const id = availableSharedIds.shift();
  takenSharedIds.push(id);
  return id;
};

const liberateId = (id) => {
  const idIndex = takenSharedIds.findIndex((foundId) => foundId === id);

  takenSharedIds.splice(idIndex, 1);

  availableSharedIds.push(id);
};

(() => {
  for (let i = 0; i < 1000; i++) {
    const id = makeId();
    if (!availableSharedIds.includes(id)) {
      availableSharedIds.push(id);
    }
  }
})();

module.exports = { getId, liberateId };
