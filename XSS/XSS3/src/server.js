import express from "express"
import "dotenv/config"
import { db } from "./db.js"
import cookieParser from "cookie-parser"

const PORT = 8000

const server = express()

server.use('/', express.static("./public"))

server.use("/post", express.json())

server.use(cookieParser())

server.post("/post", async (req, res) => {
  const author = req.body.author
  const content = req.body.content
  
  await db.any(
    "INSERT INTO posts (username, content) VALUES ($1, $2);",
    [`${author}`, `${content}`]
  )

  res.status(201).cookie("sessionId", "youPassedTheLab").end()
})

server.get("/posts", async (req, res) => {
  const posts = await db.any(
    "SELECT * FROM posts;"
  )
  
  let htmlForPosts = ""

  for (let post of posts) {
    htmlForPosts += `
      <div class="post">
        <p class="author">By: ${post.username}</p>
        <p class="content">${post.content}</p>
      </div>
    `
  }

  res.json(htmlForPosts)
})

server.listen(PORT, "127.0.0.1",() => console.log(`Server listening on port ${PORT}`))