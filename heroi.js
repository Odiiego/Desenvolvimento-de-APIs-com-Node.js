module.exports = class Heroi {
  constructor({ nome, poder, id }) {
    this.nome = nome;
    this.poder = poder;
    this.id = id === undefined ? Date.now() : id;
  }
};
