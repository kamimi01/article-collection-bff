const express = require("express");
const router = express.Router();

router.get("/articles", (req, res) => {
  const qiitaUserName = req.query.qiitaUserName
  const noteUserName = req.query.noteUserName
  res.json({ message: noteUserName });
});

module.exports = router;
