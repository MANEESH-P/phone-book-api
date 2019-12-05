var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var contactSchema = new Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    country: { type: String, required: true },
    imagePath: { type: String, required: true },
    isFavourite: { type: Boolean, default: false }
  },
  {
    versionKey: false
  }
);

const contact = mongoose.model("contacts", contactSchema);
module.exports = contact;
