// By default jest does not work with the new import syntax
// We should add NODE_OPTIONS=--experimental-vm-modules to the package.json (test script) to enable that
// ON WINDOWS YOU HAVE TO USE CROSS-ENV PACKAGE TO BE ABLE TO PASS ENV VARS TO COMMAND LINE SCRIPTS!!
import supertest from "supertest"
import mongoose from "mongoose"
import dotenv from "dotenv"
import server from "../src/server.js"
import ProductsModel from "../src/products/model.js"

dotenv.config() // This command forces .env variables to be loaded into precess.env. This is the way to go when you can't use -r dotenv/config

// supertest is capable of executing server.listen if we pass the Express server to it, it will give us back a client to be used to run http requests on that server
const client = supertest(server)

const newProduct = {
  name: "test",
  description: "bal bla bla",
  price: 29,
}

const notValidProduct = {
  description: "bal bla bla",
  price: 29,
}

beforeAll(async () => {
  // beforeAll hook could be used to connect to Mongo and doing some initial setup before running tests ( like inserting mock data into collections)
  await mongoose.connect(process.env.MONGO_TEST_CONNECTION)
  const product = new ProductsModel(newProduct)
  await product.save()
})

afterAll(async () => {
  // afterAll hook could be used to close the connection to Mongo gently and clean up db/collections
  await ProductsModel.deleteMany()
  await mongoose.connection.close()
})

describe("Test Products APIs", () => {
  it("Should check that Mongo connection string is not undefined", () => {
    expect(process.env.MONGO_TEST_CONNECTION).toBeDefined()
  })

  it("Should test that GET /products returns a success status and a body", async () => {
    const response = await client.get("/products").expect(200)
    console.log(response.body)
  })

  it("Should test that POST /products returns a valid _id and 201", async () => {
    const response = await client.post("/products").send(newProduct).expect(201)
    expect(response.body._id).toBeDefined()
  })

  it("Should test that POST /products with a not valid product returns 400", async () => {
    await client.post("/products").send(notValidProduct).expect(400)
  })
})
