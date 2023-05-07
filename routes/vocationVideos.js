const router = require("express").Router();
const VocationVideo = require("../models/VocationVideo");
const verify = require("../middlewares/verifyToken");

//CREATE
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newVocationVideo = new VocationVideo(req.body);
    try {
      const savedVocationVideo = await newVocationVideo.save();
      res.status(200).json(savedVocationVideo);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to create vocation videos");
  }
});

//GET ONE
router.get("/find/:id", verify, async (req, res) => {
  try {
    const vocationVideo = await VocationVideo.findById(req.params.id);
    res.status(200).json(vocationVideo);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const vocationVideos = query
      ? await VocationVideo.find().sort({ _id: -1 }).limit(10)
      : await VocationVideo.find();
    res.status(200).json(vocationVideos);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedVocationVideo = await VocationVideo.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(201).json(updatedVocationVideo);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to update this vocation video!");
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await VocationVideo.findByIdAndDelete(req.params.id);
      res.status(200).json("Vocation video has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

module.exports = router;