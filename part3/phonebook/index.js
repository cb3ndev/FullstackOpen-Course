const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
require('dotenv').config();

app.use(cors())

app.use(express.json())

//morgan middleware:
morgan.token('postContent', function getBody (req) {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postContent'))
app.use(express.static('build'))

personsData = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  const date = new Date()
  const numberOfPeople = personsData.length
  response.send(`<div>Phonebook has info for ${numberOfPeople} people</div> <div>${date}<div/>`)
})

app.get('/api/persons', (request, response) => {
  response.json(personsData)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = personsData.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()}
})

app.post('/api/persons', (request, response) => {  
  const body = request.body
  
  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }
  if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }
  const ifNameExist= personsData.some(person => person.name === body.name)
  if (ifNameExist){
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const person = {
    id: Math.floor(Math.random() * 9999),
    name: body.name,
    number: body.number
  }

  personsData = personsData.concat(person)

  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  personsData = personsData.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})