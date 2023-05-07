const router = require("express").Router();
const ApostolateType = require("../models/ApostolateType");
const verify = require("../middlewares/verifyToken");

//CREATE
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newApostolateType = new ApostolateType(req.body);
    try {
      const savedApostolateType = await newApostolateType.save();
      res.status(200).json(savedApostolateType);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to create an apostolate type");
  }
});

//GET ONE
router.get("/find/:id", verify, async (req, res) => {
  try {
    const apostolateType = await ApostolateType.findById(req.params.id);
    res.status(200).json(apostolateType);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const apostolateTypes = query
      ? await ApostolateType.find().sort({ _id: -1 }).limit(10)
      : await ApostolateType.find();
    res.status(200).json(apostolateTypes);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedApostolateType = await ApostolateType.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(201).json(updatedApostolateType);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to update this apostolate type!");
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await ApostolateType.findByIdAndDelete(req.params.id);
      res.status(200).json("Apostolate Type has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

module.exports = router;