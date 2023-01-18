import express from "express";
import WaifuModel from "./model.js";
import createHttpError from "http-errors";
const waifuRouter = express.Router();

// POST

waifuRouter.post("/", async (req, res, next) => {
  try {
    const newWaifu = new WaifuModel(req.body);
    const { _id } = await newWaifu.save();
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});
// GET

waifuRouter.get("/", async (req, res, next) => {
  try {
    const waifus = await WaifuModel.find();
    res.send(waifus);
  } catch (error) {
    next(error);
  }
});

// GET BY ID

waifuRouter.get("/:waifuId", async (req, res, next) => {
  try {
    const waifu = await WaifuModel.findById(req.params.waifuId);
    if (waifu) {
      res.send(waifu);
    } else {
      next(
        createHttpError(404, `Waifu with id ${req.params.waifuId} not found!`)
      );
    }
  } catch (error) {
    next(error);
  }
});

//PUT

waifuRouter.put("/:waifuId", async (req, res, next) => {
  try {
    const updatedWaifu = await WaifuModel.findByIdAndUpdate(
      req.params.waifuId,
      req.body,
      { new: true, runValidators: true }
    );
    if (updatedWaifu) {
      res.send(updatedWaifu);
    } else {
      next(
        createHttpError(404, `Waifu with id ${req.params.waifuId} not found!`)
      );
    }
  } catch (error) {
    next(error);
  }
});

// DELETE

waifuRouter.delete("/waifuId", async (req, res, next) => {
  try {
    const deletedWaifu = await WaifuModel.findByIdAndDelete(req.params.waifuId);
    if (deletedWaifu) {
      res.status(204).send();
    } else {
      next(
        createHttpError(404, `Waifu with id ${req.params.waifuId} not found!`)
      );
    }
  } catch (error) {
    next(error);
  }
});

export default waifuRouter;
