import express from "express"
import "dotenv/config"
import { db } from "./db.js"
import cookieParser from "cookie-parser"

const PORT = 8000

const server = express()

server.use(express.static("./public"))

server.use(cookieParser())

server.get("/query", async (req, res) => {
  const query = req.query.search

  const queryResult = await db.any(
    "SELECT sentence FROM strings WHERE sentence ILIKE $1",
    [`%${query}%`]
  )
  
  let string = `<u>Your results for <em>"${query}"</em></u>:<br>`
  for (let entry of queryResult)
    string += `${entry.sentence}<br>`
  
  res.cookie("sessionId", "youPassedTheLab")
  res.json(string)
})

server.listen(PORT, "127.0.0.1", () => console.log(`Server is listening on port ${PORT}`))
