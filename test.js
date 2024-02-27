const { deepEqual, ok } = require('assert');
const database = require('./database');

const DEFAULT_ITEM = {
  nome: 'Flash',
  poder: 'Speed',
  id: 1,
};

describe('Suite de manipulação de Heróis', () => {
  it('Deve cadastrar um herói, usando arquivos', async () => {
    const expected = DEFAULT_ITEM;
    await database.cadastrar(DEFAULT_ITEM);
    const [actual] = await database.listar(DEFAULT_ITEM.id);

    deepEqual(actual, expected);
  });

  it('Deve pesquisar um herói usando arquivos', async () => {
    const expected = DEFAULT_ITEM;
    const [result] = await database.listar(expected.id);
    deepEqual(result, expected);
  });

  it('Deve atualizar o herói por id', async () => {
    const expected = {
      ...DEFAULT_ITEM,
      nome: 'Batman',
      poder: 'Dinheiro',
    };
    await database.atualizar(DEFAULT_ITEM.id, expected);
    const [result] = await database.listar(DEFAULT_ITEM.id);
    deepEqual(result, expected);
  });

  it('Deve remover um herói por id', async () => {
    const expected = true;
    const result = await database.remover(DEFAULT_ITEM.id);
    deepEqual(result, expected);
  });
});
