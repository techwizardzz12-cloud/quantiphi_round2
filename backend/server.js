import app from './app.js'

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`Task API listening on http://localhost:${port}`)
})
