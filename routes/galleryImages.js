const router = require("express").Router();
const GalleryImage = require("../models/GalleryImage");
const verify = require("../middlewares/verifyToken");

//CREATE
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newGalleryImage = new GalleryImage(req.body);
    try {
      const savedGalleryImage = await newGalleryImage.save();
      res.status(200).json(savedGalleryImage);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to create gallery items");
  }
});

//GET ONE
router.get("/find/:id", verify, async (req, res) => {
  try {
    const galleryImage = await GalleryImage.findById(req.params.id);
    res.status(200).json(galleryImage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const galleryImages = query
      ? await GalleryImage.find().sort({ _id: -1 }).limit(10)
      : await GalleryImage.find();
    res.status(200).json(galleryImages);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedGalleryImage = await GalleryImage.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(201).json(updatedGalleryImage);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to update this Gallery Image!");
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await GalleryImage.findByIdAndDelete(req.params.id);
      res.status(200).json("Gallery Image has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

module.exports = router;