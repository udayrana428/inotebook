const connectToMongo=require('./db')
const express = require('express')
const app = express()
const port = 5000
connectToMongo()
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use(express.json())
app.use('/api/auth',require("./routes/auth"))
app.use('/api/notes',require("./routes/notes"))
app.listen(port, () => {
  console.log(`iNotebook listening at http://localhost:${port}`)
})
