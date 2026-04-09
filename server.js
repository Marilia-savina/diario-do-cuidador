const express = require('express')
const cors = require('cors')
const {criarBanco} = require('./database')


const app = express()
app.use(express.json())
app.use (cors())


// Rota teste front
app.get('/', (req, res) => {
    res.send(`
    <h1> API  Diário do Cuidador funcionando </h1>
    <h3> link atual com /Pacientes : te direciona para uma lista de pacientes cadastrados </h3>
    `)  
});

// rota para registrar paciente
//Listar pacientes
app.get('/Pacientes', async (req, res) => {
  const db = await criarBanco();
  const Pacientes = await db.all(`SELECT * FROM  Pacientes`)
  res.json(Pacientes)
})


app.post('/Pacientes', async (req, res) => {

  const { nome, idade, sexo, endereco, diagnostico, medicamentos, contato_familiar, principais_dificuldades_do_paciente,dia_horario_de_acompanhamento, observacoes} = req.body

  const db = await criarBanco()

    await db.run(
    `INSERT INTO Pacientes 
    (nome, idade, sexo, endereco, diagnostico, medicamentos, contato_familiar,  principais_dificuldades_do_paciente , dia_horario_de_acompanhamento, observacoes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [nome, idade, sexo, endereco, diagnostico, medicamentos, contato_familiar,  principais_dificuldades_do_paciente,dia_horario_de_acompanhamento, observacoes])

  res.send(`Paciente ${nome}, registrado com sucesso!!`)
})




//Atualizar cadastro do paciente
app.put('/Pacientes/:id', async (req, res) => {
  const {id} = req.params
  const {idade, sexo, endereco} = req.body

  const db = await criarBanco()

  await db.run(`
    UPDATE Pacientes
    SET idade = ? , sexo =?, endereco=?
    WHERE id = ?`, [idade, sexo, endereco, id])

  res.send(`cadastro do Paciente ${id} atualizado  com sucesso!!`)
})


//Deletar cadastro do paciente
app.delete ('/Pacientes/:id', async (req, res) => {
  const db = await criarBanco()

  await db.run(`DELETE FROM Pacientes WHERE id=?`, [req.params.id])

  res.send(` cadastro do Paciente ${req.params.id}, deletado com sucesso!!`)

})


// Servidor
const PORT =  process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`servidor rodando na porta ${PORT}`)
})