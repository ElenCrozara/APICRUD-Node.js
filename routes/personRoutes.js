const router = require('express').Router()
const Person = require('../models/Person')

// rotas da API
// create ou criação de dados com post
router.post('/', async (req, res) => {

    // req.body
    // {name: "Elen", salary: 5600, approved: false}
    const { name, salary, approved } = req.body // metodo destructin onde criamos varias variáveis de uma só vez

    // if (!name) {
    //     res.status(422).json({ error: 'O nome é obrigatório!' })
    //     return
    // }

    const person = {
        name,
        salary,
        approved
    }

    //create
    try {
        //criando dados no mongodb através do mongoose
        await Person.create(person)
        res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' })
        return

       

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// read - leitura/consulta de dados com Get
router.get('/', async (req, res) => {
    try {

        const people = await Person.find()
        res.status(200).json(people)

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// extrair o dado da requisição, pela url = req.params buscando por id
router.get('/:id', async (req, res) => {

    const id = req.params.id
    try {

        const person = await Person.findOne({ _id: id })

        if(!person) {
            res.status(422).json({message: 'O usuário não foi encontrado!!'})
            return
        }
        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({ error: error })
    }

})

// Update - atualização parcial (de apenas um valor) com PATCH

router.patch('/:id', async (req, res) => {

    const id = req.params.id
    const { name, salary, approved} = req.body
    const person = {
        name,
        salary,
        approved,
    }
    try {

        const updatePerson = await Person.updateOne({_id: id}, person)
        res.status(200).json(person)


    }catch (error) {
        res.status(500).json({error: error})
    }


})

// Deletando dados
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const person = await Person.findOne({_id: id})

    if(!person) {
        res.status(422).json({ message: 'O usuário não foi encontrado!!'})
        return
    }

    try {
        await Person.deleteOne({_id:id})
        res.status(200).json({ message: 'Usuário removido com susesso!!'})
    }catch (error) {
        res.status(500).json({ error: error})
    }
})




module.exports = router