var express = require("express");
var router = express.Router();

router.use("/contact", require("../apis/contact.api"));
router.use("/file", require("../apis/file.api"));

module.exports = router;
