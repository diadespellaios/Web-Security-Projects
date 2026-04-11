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

  const queryResult = await db.any(`
      SELECT * FROM strings
      WHERE sentence ILIKE '%${query}%';
    `)
  
    res.cookie("sessionId", "youPassedTheLab")
    res.json(queryResult)
})

server.listen(PORT, "127.0.0.1", () => console.log(`Server is listening on port ${PORT}`))