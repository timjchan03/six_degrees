const express = require("express");
const router = express.Router();
let { searchArtist } = require("../sqlite3");

router.get("/list/:name", async (req, res) => {
  let { name } = req.params;
  console.log(name);
  try {
    searchArtist(name, function (artist_data) {
      res.status(200).json({
        data: artist_data,
      });
    });
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err,
    });
  }
});

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    searchArtist(function (artist_data) {
      let artist = artist_data.find((artist) => artist.id === id);
      res.status(200).json({
        data: artist,
      });
    });
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err,
    });
  }
});

module.exports = router;
