// Configurações iniciais, chamar os pacotes baixados
const express = require('express')
const app = express()
const mongoose = require('mongoose')



// forma de ler Json (usar middlewares que são recursos que são executados entre as requisições e respostas)
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

//rotas
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

// rota inicial / endpoint
app.get('/', (req, res) =>{
    //mostrar a requisição

    res.json({ message: 'Oi Express!'})//////
})


// entregar uma porta
mongoose.connect('mongodb+srv://elenoliveira:Paisetabranca00@cluster0.ktcwubc.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
 console.log("Conectamos ao MongoDB!!")////
 app.listen(3333) 
})
.catch((err) => console.log(err))
