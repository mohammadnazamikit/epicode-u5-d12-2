import express from "express"
import createHttpError from "http-errors"
import ProductsModel from "./model.js"

const productsRouter = express.Router()

productsRouter.post("/", async (req, res, next) => {
  try {
    const newProduct = new ProductsModel(req.body)
    const { _id } = await newProduct.save()
    res.status(201).send({ _id })
  } catch (error) {
    next(error)
  }
})

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await ProductsModel.find({})
    res.send(products)
  } catch (error) {
    next(error)
  }
})

export default productsRouter
