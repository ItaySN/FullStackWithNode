require('dotenv').config();
const Person = require('./models/person');

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('build'));
const cors = require('cors')
app.use(cors());

const morgan = require('morgan');

morgan.token('body', function (req, res) { 
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/', (req,res) =>{
    res.send('<h1>Hello World! </h1>');
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/info', (request, response) => {
    Person.find({}).then(people => {
        response.send(`Phonebook has info for ${people.length} people<br><br>${new Date()}`)
    })
})

app.get('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id)
    if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
}) 

app.delete('/api/persons/:id', (req, res) => {
    console.log(req.params.id);
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        }).catch(error => console.log(error))
})


app.post("/api/persons", (req, res) => {
    if (!req.body.name || !req.body.number) {
        return res.status(400).json({
            error: 'content missing'
        })
    }
    const contact = new Person({
        name: req.body.name,
        number: req.body.number,
    })
    contact.save().then(savedContact => {
        res.json(savedContact)
    })

})


const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);