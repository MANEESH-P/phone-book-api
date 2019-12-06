var express = require("express");
var router = express.Router();
var path = require("path");
var multer = require("multer");
var cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dtoojisfz",
  api_key: "967129644389933",
  api_secret: "dkmWXve4JaOBJvksJN6JRu6yAdk"
});

var filePath = path.join(__dirname, "../public/images");
var absPath = "";
var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, filePath);
  },
  filename: function(req, file, callback) {
    var arr = file.originalname.split(".");
    console.log("file", file);
    cloudinary.uploader.upload(file.path, function(error, result) {
      console.log("result", result);
    });

    var fileExt = arr[arr.length - 1];
    var filename = file.fieldname + "-" + Date.now() + "." + fileExt;
    absPath = "images" + "/" + filename;
    callback(null, filename);
    console.log("filename" + filename);
  }
});

//'file' is the name of passing parameters
var upload = multer({
  storage: storage
}).single("file");

router.post("/", function(req, res) {
  console.log("inside file api");
  upload(req, res, function(err) {
    if (err) {
      res.json("error");
      return;
    }
    console.log(absPath);
    res.json({
      filePath: absPath
    });
  });
});
module.exports = router;
