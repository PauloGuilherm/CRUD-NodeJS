const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const User = require('./models/cliente')

app.use(bodyParser.json())

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})

app.get('/', async(req, res) => {
    res.sendFile(__dirname + '/view/index.html')
})

app.post('/cadastro', async(req, res) => {
    console.log(req.body)

    await User.create(req.body)
        .then(() => {
            return res.json({
                mensagem: 'Usuário cadastrado com sucesso'
            }).catch(() => {
                return res.status(400).json({
                    mensagem: 'Erro ao cadastrar usuário'
                })
            })
        })

})