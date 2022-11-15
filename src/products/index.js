import express from "express";
import createHttpError from "http-errors";
import ProductsModel from "./model.js";

const productsRouter = express.Router();

productsRouter.post("/", async (req, res, next) => {
  try {
    const newProduct = new ProductsModel(req.body);
    const { _id } = await newProduct.save();
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await ProductsModel.find({});
    res.send(products);
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:id", async (req, res, next) => {
  try {
    const product = await ProductsModel.findById(req.params.id);
    res.status(200).send(product);
  } catch (error) {
    next(createHttpError(404, `the product you searching for, not found`));
  }
});

productsRouter.put("/:Id", async (req, res, next) => {
  try {
    const updatedProduct = await ProductsModel.findByIdAndUpdate(
      req.params.Id,
      req.body,
      { new: true, runValidators: true }
    );
    if (updatedProduct) {
      res.send(updatedProduct);
    } else {
      next(createHttpError(404, `user with id ${req.params.Id} didnt found`));
    }
  } catch (error) {
    next(error);
  }
});

productsRouter.delete("/:id", async (req, res, next) => {
  try {
    const product = await ProductsModel.findByIdAndDelete(req.params.id);
    if (product) {
      res.status(204).send();
    } else {
      next(createHttpError(404, "the product you searching for not found"));
    }
  } catch (error) {
    next(error);
  }
});
export default productsRouter;
