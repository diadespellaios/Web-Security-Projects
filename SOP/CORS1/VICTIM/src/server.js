import express from "express"
import cookieParser from "cookie-parser"

const PORT = 5000

const server = express()

server.use(express.static("./public"))

server.use(express.json())

server.use(cookieParser())

server.post("/login", (req, res) => {
  const { username, password } = req.body
  if (username === "victim45" && password === "123456")
    res.cookie("sessionId", "abcd1234").status(200).end()
  else
    res.status(401).end()
})

server.get("/user/data", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "none")
  res.setHeader("Access-Control-Allow-Credentials", "true")

  if (req.cookies.sessionId === "abcd1234")
    return res.json({data: "Your personal data"})

  res.status(401).end()
})

server.listen(PORT, "127.0.0.1", () => console.log(`Victim is listening on port ${PORT}`))