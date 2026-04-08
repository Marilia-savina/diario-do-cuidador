const sqlite3 = require('sqlite3')
const {open} = require('sqlite')


const criarBanco = async () => {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    })


// Criar tabela
  await db.exec(`
    CREATE TABLE IF NOT EXISTS Pacientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      idade INTEGER,
      sexo TEXT,
      endereco TEXT,
      diagnostico TEXT,
      medicamentos TEXT,
      contato_familiar TEXT,
      principais_dificuldades_do_paciente TEXT,
      dia_horario_de_acompanhamento TEXT,
      observacoes TEXT )
  `)
console.log("tabela pacientes e banco de  dados criado com sucesso!!!")

 return db

  }


module.exports = {criarBanco}
