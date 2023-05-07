const router = require("express").Router();
const Apostolate = require("../models/Apostolate");
const verify = require("../middlewares/verifyToken");

//CREATE
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newApostolate = new Apostolate(req.body);
    try {
      const savedApostolate = await newApostolate.save();
      res.status(200).json(savedApostolate);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to create an apostolate");
  }
});

//GET ONE
router.get("/find/:id", verify, async (req, res) => {
  try {
    const apostolate = await Apostolate.findById(req.params.id);
    res.status(200).json(apostolate);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const apostolates = query
      ? await Apostolate.find().sort({ _id: -1 }).limit(10)
      : await Apostolate.find();
    res.status(200).json(apostolates);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedApostolate = await Apostolate.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(201).json(updatedApostolate);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to update this apostolate!");
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Apostolate.findByIdAndDelete(req.params.id);
      res.status(200).json("Apostolate has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

module.exports = router;