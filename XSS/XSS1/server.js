import express from "express"

const PORT = 8000

const app = express()

app.use(express.static("./public"))

app.listen(PORT, () => {
  console.log(`server connected on port ${PORT}`)
})
