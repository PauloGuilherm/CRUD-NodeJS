const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const User = require('./models/cliente')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})

app.get('/', async(req, res) => {
    const select = await User.findAll()
})

app.get('/:id', async(req, res) => {
    const selectId = await User.findByPk(req.params.id)
})

app.post('/cadastro', async(req, res) => {
    User.create(req.body)
})

app.put('/editar/:id', async(req, res) => {
    const editID = await User.findByPk(req.params.id)
    editID.name = req.body.name
    editID.save()
})

app.delete('/delete/:id', async(req, res) => {
    const deletID = await User.findByPk(req.params.id)
    deletID.destroy()
})