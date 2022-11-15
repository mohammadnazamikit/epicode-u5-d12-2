import express from "express"
import cors from "cors"
import usersRouter from "./users/index.js"
import productsRouter from "./products/index.js"
import {
  forbiddenErrorHandler,
  genericErroHandler,
  notFoundErrorHandler,
  unauthorizedErrorHandler,
  badRequestErrorHandler,
} from "./errorHandlers.js"

const server = express()

// ******************************** MIDDLEWARES *********************************

server.use(cors())
server.use(express.json())

// ************************************* ENDPOINTS *******************************

server.use("/users", usersRouter)
server.use("/products", productsRouter)

// ********************************** ERROR HANDLERS *****************************

server.use(badRequestErrorHandler)
server.use(unauthorizedErrorHandler)
server.use(forbiddenErrorHandler)
server.use(notFoundErrorHandler)
server.use(genericErroHandler)

export default server
