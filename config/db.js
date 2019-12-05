const mongoose = require("mongoose");

const connection = mongoose.connect(
  "mongodb+srv://maneesh:maneesh@reactphonebook-qsgkq.mongodb.net/contactsdb?retryWrites=true&w=majority",
  {
    useNewUrlParser: true
  }
);

// const connection = mongoose.connect("mongodb://localhost:27017/phonebook", {
//   useNewUrlParser: true
// });

const db = mongoose.connection.on("error", err => {
  console.log(err);
});

mongoose.connection.on("connected", res => {
  console.log("connected!");
});
