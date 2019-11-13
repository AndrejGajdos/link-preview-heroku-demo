var express = require("express");
var linkExtractor = require("link-preview-generator");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/link", async function(req, res) {
  var url = req.body.url;
  try {
    const previewData = await linkExtractor(url);
    res.end(JSON.stringify(previewData));
  } catch (e) {
    res.status(500).send({ error: JSON.stringify(e.message) });
  }
});

module.exports = router;
