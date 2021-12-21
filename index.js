const express = require('express')
const app = express()
const port = 3000


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/view/index.html')
})