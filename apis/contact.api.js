var express = require("express");
var router = express.Router();
const contact = require("../models/contact.model");
var httpStatus = require("http-status-codes");
// var mongoose = require("mongoose");

router.route("/").get((req, res) => {
  contact
    .find({})
    .then(docs => {
      res.send(docs);
    })
    .catch(err => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
});

router.route("/favs").get((req, res) => {
  contact
    .find({ isFavourite: true })
    .then(docs => {
      res.send(docs);
    })
    .catch(err => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
});

router.route("/").post((req, res) => {
  const obj = req.body;
  console.log(obj);
  contact
    .create(obj)
    .then(docs => {
      res.status(httpStatus.CREATED).send(obj);
    })
    .catch(err => {
      console.log(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
});

router.route("/delete").post((req, res) => {
  const obj = req.body;
  contact
    .deleteOne({ _id: req.body._id })
    .then(() => {
      res.status(201).send(obj);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.route("/setfav/:id").put((req, res) => {
  console.log("inside setfav api");
  let id = req.params.id;
  console.log(id);
  const obj = req.body;
  fav = req.body.fav;
  console.log(obj);

  contact.findByIdAndUpdate(
    id,
    {
      isFavourite: fav
    },
    (err, doc) => {
      if (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
      } else res.status(httpStatus.OK).send(doc);
    }
  );
});

router.route("/:id").put((req, res) => {
  let id = req.params.id;
  const obj = req.body;
  console.log("inside edit contact api");

  contact.findByIdAndUpdate(
    id,
    {
      name: obj.name,
      contact: obj.contact,
      country: obj.country,
      address: obj.address,
      imagePath: obj.imagePath
    },
    (err, doc) => {
      if (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
      } else res.status(httpStatus.OK).send(doc);
    }
  );
});

module.exports = router;
