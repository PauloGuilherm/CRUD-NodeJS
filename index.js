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
    const select = await User.findAll();
    res.json(select)
})

app.get('/:id', async(req, res) => {
    const selectId = await User.findByPk(req.params.id)
    res.json(selectId)
})

app.post('/cadastro', async(req, res) => {
    await User.create(req.body)
        .then(() => {
            return res.json({ message: 'Usuário cadastrado com sucesso' })
        }).catch(() => {
            return res.status(400).json({ message: 'Erro ao cadastrar usuário' })
        })

})

app.patch('/editar/:id', async(req, res) => {
    let editID = await User.findByPk(req.params.id)

    if (req.body.name != undefined) {
        editID.name = req.body.name
    }
    if (req.body.email != undefined) {
        editID.email = req.body.email
    }
    if (req.body.telefone != undefined) {
        editID.telefone = req.body.telefone
    }
    if (req.body.profissao != undefined) {
        editID.profissao = req.body.profissao
    }

    editID.save()
        .then(() => {
            return res.json({ message: 'Usuário editado com sucesso' })
        }).catch(() => {
            return res.status(400).json({ message: 'Erro ao editar usuário' })
        })
})

app.delete('/delete/:id', async(req, res) => {
    let deletID = await User.findByPk(req.params.id)
    if (deletID == null) {
        return res.json({ message: 'ID inválido, usuário inexistente' })
    }
    deletID.destroy()
        .then(() => {
            return res.json({ message: 'Usuário deletado com sucesso' })
        }).catch(() => {
            return res.status(400).json({ message: 'Erro ao deletar usuário' })
        })
})