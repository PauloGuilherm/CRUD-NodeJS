const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('curso_node', 'root', '12345', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate()
    .then(() => {
        console.log('Banco conectado com sucesso')
    }).catch((err) => {
        console.error("Conexão com o banco falhou: " + err.message)
    })
module.exports = sequelize