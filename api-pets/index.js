import express from 'express'
import cors from 'cors'
import { pets } from './mongoConnect.js'
import { request } from 'http'

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
  await pets.findOneAndDelete(request.body)
  const allPets = await pets.find().toArray()
  response.send(allPets)
})