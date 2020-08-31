const http = require('http');
const express = require('express');
const { res, json } = require('express');
const { brotliDecompress } = require('zlib');


const app = express();
app.use(express.json());


let persons = [
{
    name:"Arto Hellas",
    number: "040=123456",
    id:1
},
{
    name:"Dan Avramov",
    number: "39-44-5323523",
    id:2
},
{
    name:"Mary Poppendieck",
    number: "39-23-6423122",
    id:3
},
];
  

app.get('/', (req,res) =>{
    res.send('<h1>Hello World! </h1>');
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req,res) =>{
    if(persons.length === 0)
    {
        res.send(`<p> The phonebook is empty </p> <br> ${new Date()}`);
    }
    res.send(`Phonebook has info for ${persons.length} people <br> ${new Date()}`);
})

    const id = Number(req.params.id);
  } else {
    res.status(404).end()
  }
}) 


    res.status(204).end();
})


}


    }

    }



const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);