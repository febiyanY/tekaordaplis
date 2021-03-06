const express = require('express')
const path = require('path')

const app = express()
const publicPath = path.join(__dirname, '../build')
const PORT = process.env.PORT || 3000
app.use(express.static(publicPath))

app.all("*", (req,res) => res.sendFile(path.join(publicPath, 'index.html')))

app.listen(PORT, () => {
    console.log('Listening on port', PORT)
})