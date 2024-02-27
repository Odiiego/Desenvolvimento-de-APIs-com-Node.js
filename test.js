const { deepEqual, ok } = require('assert');
const database = require('./database');

const DEFAULT_ITEM_CADASTRAR = {
  nome: 'Flash',
  poder: 'Speed',
  id: 1,
};

describe('Suite de manipulação de Heróis', () => {
  it('Deve cadastrar um herói, usando arquivos', async () => {
    const expected = DEFAULT_ITEM_CADASTRAR;
    await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
    const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id);

    deepEqual(actual, expected);
  });
  it('Deve pesquisar um herói usando arquivos', async () => {
    const expected = DEFAULT_ITEM_CADASTRAR;
    const [result] = await database.listar(expected.id);
    deepEqual(result, expected);
  });
  it('Deve remover um herói por id', async () => {
    const expected = true;
    const result = await database.remover(DEFAULT_ITEM_CADASTRAR.id);
    deepEqual(result, expected);
  });
});
