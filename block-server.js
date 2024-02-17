// Blocking a node server

const express = require("express")

const app = express()

function delay(duration) {
  const startTime = Date.now()
  console.log(startTime)
  while (Date.now() - startTime < duration) {
    // event loop is blocked for x duration .....
  }
}

app.get("/", (req, res) => {
  res.send("Performance-example")
})

app.get("/timer", (req, res) => {
  delay(9000)
  res.send("######")
})

app.listen(3000)
