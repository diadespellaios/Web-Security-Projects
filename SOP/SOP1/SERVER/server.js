import express from "express"
import cors from "cors"

const PORT = 8000

const app = express()

app.use(cors({origin: "http://localhost:8001"}))

app.get("/endpoint", (req, res) => {
  res.json({return: "some", new: "data"})
})

app.listen(PORT, "127.0.0.1", () => console.log(`Server listening on port ${PORT}`))
