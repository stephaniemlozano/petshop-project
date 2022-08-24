import express, { response } from 'express'
import cors from 'cors'
import { pets } from './mongoConnect.js'


const app = express()
app.use(express.json())
app.use(cors())

const PORT = 4000

app.listen(4000, () => {
  console.log('are you there? can you hear me?', PORT)
})

app.get('/', async (request, response) => {
  const allPets = await pets.find().toArray()
  console.log(allPets)
  response.send(allPets)
})

app.post('/addpets', async (request, response) => {
  await pets.insertOne(request.body)
  const allPets = await pets.find().toArray()
  response.send(allPets)
})

app.delete('/deletepets', async (request, response) => {
  console.log('here is request.query', request.query)
  await pets.findOneAndDelete(request.body)
  const allPets = await pets.find().toArray()
  response.send(allPets)
})

app.put('/updatepets', async (request, response) => {
  await pets.findOneAndUpdate(request.query, {$set: request.body})
  const allPets = await pets.find().toArray()
  response.send(allPets)
})