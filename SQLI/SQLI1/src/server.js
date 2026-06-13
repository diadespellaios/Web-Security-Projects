import express from "express"
import "dotenv/config"
import { db } from "./db.js"
import bcrypt from "bcryptjs"
import session from "express-session"

const PORT = 8000
const secret = process.env.SPIRAL_SESSION_SECRET

const requireAuth = (req, res, next) => {
  if(!req.session?.username) {
    console.log("Auth failed")
    return res.redirect("/login.html")
  }
  console.log("Auth success")
  next()
}

const server = express()

server.use(express.json())

server.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  }
}))

server.use(express.static("./public"))

server.post("/register", async (req, res) => {
  const { fullName, username, password } = req.body
  
  const existing = await db.oneOrNone (
    "SELECT id FROM users WHERE username = $1;",
    [username]
  )

  if (existing) {
    return res.status(400).json({Registration: "Registration Failed: Username taken"})
  }
  
  await db.none (
  "INSERT INTO users (name, username, password) VALUES ($1, $2, $3);",
  [fullName, username, password]
  )

  res.status(201).json({Registration: "Registration Succeeded"})
})

server.post("/login", async (req, res) => {
  const { username, password } = req.body
  
  const user = await db.oneOrNone (
    `SELECT username FROM users WHERE username = '${username}' AND (password = '${password}');`
  )
  
  if (user) {
    req.session.username = user.username
    return res.json({ok: true})
  }

  res.status(401).json({Login: "Invalid Credentials"})
})

server.get("/user", requireAuth, (req, res) => {
  res.redirect("./user.html")
})


server.get("/user/data", requireAuth, async (req, res) => {
  const notes = await db.oneOrNone (
    "SELECT user_notes FROM users WHERE username=$1;",
    [req.session.username]
  )
  
  res.json({
    notes: notes.user_notes,
    username: req.session.username
  })
})

server.put("/user/update", requireAuth, async (req, res) => {
  const { notes } = req.body
  
  try {
    await db.none (
    "UPDATE users SET user_notes = $1 WHERE username = $2;",
    [notes, req.session.username]
    )
  } catch (err) {
    console.log(err)
    return res.status(500).json({status: "Something went wrong..."})
  }
  
  res.status(200).json({status: "Notes saved"})
})

server.listen(PORT, "127.0.0.1", () => console.log(`Server is listening on port ${PORT}`))