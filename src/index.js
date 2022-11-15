import mongoose from "mongoose"
import listEndpoints from "express-list-endpoints"
import server from "./server.js"

const port = process.env.PORT || 3001

mongoose.connect(process.env.MONGO_CONNECTION)

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to Mongo!")
  server.listen(port, () => {
    console.table(listEndpoints(server))
    console.log(`Server is listening on port ${port}`)
  })
})
