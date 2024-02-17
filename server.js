// Creating clusters of node processess with master and worker
// clusters which delegate requests using round-robin approach.

const express = require("express")
const cluster = require("cluster")
const os = require("os")

const app = express()

function delay(duration) {
  const startTime = Date.now()
  console.log(startTime)
  while (Date.now() - startTime < duration) {
    // event loop is blocked for x duration .....
  }
}

app.get("/", (req, res) => {
  res.send(`Performance-example ${process.pid}`)
})

app.get("/timer", (req, res) => {
  delay(9000)
  res.send(`###### ${process.pid}`)
})

//console.log("Running server.js....")
if (cluster.isMaster) {
  console.log(`Master has been started....${process.pid}`)
  const NUM_WORKERS = os.cpus().length
  for (let i = 0; i < NUM_WORKERS; i++) {
    cluster.fork()
  }
} else {
  console.log(`Worker process started....${process.pid}`)
  app.listen(3000)
}
