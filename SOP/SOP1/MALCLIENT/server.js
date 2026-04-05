import express from "express"

const PORT = 8002

const app = express()

app.use(express.static("./public"))

app.listen(PORT, "127.0.0.1", () => console.log(`Server is listening on port ${PORT}`))