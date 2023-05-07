const router = require("express").Router();
const CarouselImage = require("../models/CarouselImage");
const verify = require("../middlewares/verifyToken");

//CREATE
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newCarouselImage = new CarouselImage(req.body);
    try {
      const savedCarouselImage = await newCarouselImage.save();
      res.status(200).json(savedCarouselImage);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to create carousel items");
  }
});

//GET ONE
router.get("/find/:id", verify, async (req, res) => {
  try {
    const carouselImage = await CarouselImage.findById(req.params.id);
    res.status(200).json(carouselImage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const carouselImages = query
      ? await CarouselImage.find().sort({ _id: -1 }).limit(10)
      : await CarouselImage.find();
    res.status(200).json(carouselImages);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedCarouselImage = await CarouselImage.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(201).json(updatedCarouselImage);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to update this Carousel Image!");
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await CarouselImage.findByIdAndDelete(req.params.id);
      res.status(200).json("Carousel Image has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

module.exports = router;