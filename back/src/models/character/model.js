import Characters from "./testdata.js";

function findAll() {
  return Characters;
}

function findByPk(id) {
  return Characters.find((character) => character.id == id);
}

function findByName(name) {
  return Characters.filter((character) =>
    character.name.toLowerCase().includes(name.trim().toLowerCase())
  );
}

export default {
  findAll,
  findByPk,
  findByName,
};
