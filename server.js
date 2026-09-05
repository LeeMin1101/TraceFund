import express from "express"

const app = express()
const PORT = process.env.PORT || 3030

app.get("/", (req, res) => {
    res.send("TraceFund API is running...")
})

app.listen(PORT, () => {
    console.log(`Backend TraceFund is running at: http://localhost:${PORT}`)
})