const mongoose = require('mongoose')

const Person = mongoose.model('Person', { // criando a tabela no banco com nome Person
    name: String,
    salary: Number,
    approved: Boolean,
})

// necessário exportar/inportar para utilizar em outro lugar 
module.exports = Person ////