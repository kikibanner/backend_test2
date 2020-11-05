const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

let persons =  [
    {
      "name": "jojo",
      "number": "oraora",
      "id": 8
    },
    {
      "name": "jotaro",
      "number": "oraora",
      "id": 9
    },
    {
      "id": 10,
      "name": "jojos",
      "number": "1111111111111111111111111"
    },
    {
      "name": "jojow",
      "number": "12222222",
      "id": 11
    },
    {
      "name": "jojow",
      "number": "12222222",
      "id": 12
    },
    {
      "name": "karto",
      "number": "tuying12",
      "id": 13
    },
    {
      "name": "karto tuyingg",
      "number": "111",
      "id": 14
    },
    {
      "name": "karto tuyingg",
      "number": "111",
      "id": 15
    },
    {
      "name": "jjoo",
      "number": "kooo",
      "id": 16
    },
    {
      "name": "jajaj",
      "number": "1222",
      "id": 17
    },
    {
      "name": "asasa",
      "number": "asas",
      "id": 18
    }
  ]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

//fetch data
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    response.json(person)

    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
    }
})



//delete data
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})

// add data
const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
}

//informasi
app.get('/info', (request, response) => {
    response.send(
        `<p>Phonebook has info for ${persons.length} persons</p>
        <p>${Date()}</p>`)
})

app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const person = {
      content: body.content,
      important: body.important || false,
      date: new Date(),
      id: generateId(),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
})
  

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})