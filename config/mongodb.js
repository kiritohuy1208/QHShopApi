const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) =>
      console.log(`MongoDb connected with host: ${con.connection.host}`)
    )
    .catch((e) => console.log(e));
};
module.exports = connectDatabase;
