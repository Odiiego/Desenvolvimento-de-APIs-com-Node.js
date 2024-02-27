const { Command } = require('commander');
const Database = require('./database');
const Heroi = require('./heroi');

async function main() {
  const program = new Command();

  program
    .version('v1')
    .option('-n,--nome [value]', 'Nome do Herói')
    .option('-p, --poder [value]', 'Poder do Herói')
    .option('-i, --id [value]', 'ID do Herói')

    .option('-c, --cadastrar', 'Cadastrar um Herói')
    .option('-r, --remover [value]', 'Remover um Herói')
    .option('-a, --atualizar [value]', 'Atualizar um Herói')
    .option('-l, --listar', 'Listar um Herói ou mais')
    .parse(process.argv);

  const options = program.opts();
  const heroi = new Heroi(options);

  try {
    if (options.cadastrar) {
      const result = await Database.cadastrar(heroi);
      if (!result) {
        console.error('Herói não foi cadastrado!');
        return false;
      }
      console.log('Herói cadastrado com sucesso!');
      return true;
    }

    if (options.remover) {
      const result = await Database.remover(heroi.id);
      if (!result) {
        console.error('Não foi possível remover o Herói!');
        return false;
      }
      console.log('Herói removido com sucesso!');
      return true;
    }

    if (options.atualizar) {
      const temp = await Database.listar(heroi.id);
      const atualizado = {
        ...JSON.parse(JSON.stringify(temp)),
        ...JSON.parse(JSON.stringify(heroi)),
      };
      const result = await Database.atualizar(heroi.id, atualizado);

      if (!result) {
        console.error('Não foi possível atualizar o Herói!');
        return false;
      }
      console.log('Herói atualizado com sucesso!');
      return true;
    }

    if (options.listar) {
      const result = await Database.listar();
      console.log(result);
      return Boolean(result.lenth);
    }
  } catch (error) {
    console.error(error);
  }
}

main();
