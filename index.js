const http = require('http');
const express = require('express');
const { res, json } = require('express');
const { brotliDecompress } = require('zlib');
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

const mongoose = require('mongoose')

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const url =
 `mongodb+srv://itayFullS:gkXEHjPspPvlt29i@cluster0.0ak1s.mongodb.net/personDB?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('person', personSchema);


// let persons = [
// {
//     name:"Arto Hellas",
//     number: "040=123456",
//     id:1
// },
// {
//     name:"Dan Avramov",
//     number: "39-44-5323523",
//     id:2
// },
// {
//     name:"Mary Poppendieck",
//     number: "39-23-6423122",
//     id:3
// },
// ];
  

app.get('/', (req,res) =>{
    res.send('<h1>Hello World! </h1>');
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/info', (req,res) =>{
    if(persons.length === 0)
    {
        res.send(`<p> The phonebook is empty </p> <br> ${new Date()}`);
    }
    res.send(`Phonebook has info for ${persons.length} people <br> ${new Date()}`);
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

app.delete('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id!==id);

    res.status(204).end();
})


const idGenreator = () => {
    return Math.floor(Math.random()*(10000000 - 1000000) + 1000000);
}

app.post('/api/persons', (req, res) => {
    const person = req.body;

    if(!person.number){
        return res.status(400).json({
            error: 'no phone number submited'
        });
    }

    if(!person.name){
        return res.status(400).json({
            error: 'no name submited'
        });
    }

    if(persons.some(p => p.name == person.name)){
        return res.status(400).json({
            error: 'person already exist'
        });
    }

    person.id = idGenreator();

    persons = persons.concat(person);

    res.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);