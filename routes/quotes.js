const router = require("express").Router();
const Quote = require("../models/Quote");
const verify = require("../middlewares/verifyToken");

//CREATE
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newQuote = new Quote(req.body);
    try {
      const savedQuote = await newQuote.save();
      res.status(200).json(savedQuote);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to create Quotes");
  }
});

//GET ONE
router.get("/find/:id", verify, async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    res.status(200).json(quote);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const quotes = query
      ? await Quote.find().sort({ _id: -1 }).limit(10)
      : await Quote.find();
    res.status(200).json(quotes);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedQuote = await Quote.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(201).json(updatedQuote);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to update this Quote!");
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Quote.findByIdAndDelete(req.params.id);
      res.status(200).json("Quote has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

module.exports = router;