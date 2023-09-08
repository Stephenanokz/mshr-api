const router = require("express").Router();
const Faq = require("../models/Faq");
const verify = require("../middlewares/verifyToken");

//CREATE
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newFaq = new Faq(req.body);
    try {
      const savedFaq = await newFaq.save();
      res.status(200).json(savedFaq);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to create Faqs");
  }
});

//GET ONE
router.get("/find/:id", verify, async (req, res) => {
  try {
    const faq = await Faq.findById(req.params.id);
    res.status(200).json(faq);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const faqs = query
      ? await Faq.find().sort({ _id: -1 }).limit(10)
      : await Faq.find();
    res.status(200).json(faqs);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedFaq = await Faq.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(201).json(updatedFaq);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to update this Faq!");
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Faq.findByIdAndDelete(req.params.id);
      res.status(200).json("Faq has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

module.exports = router;