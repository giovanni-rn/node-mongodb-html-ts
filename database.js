const { MongoClient } = require("mongodb"); // database operations

const mongoURI =
  "mongodb+srv://oriano:db-pass@cluster.tcazqru.mongodb.net/node-users?retryWrites=true&w=majority"; // mongodb uri with user and password
const dbName = "node-users"; // our project database
let db; // database instance

async function mongodbConnect() {
  try {
    const client = await MongoClient.connect(mongoURI, {
      useUnifiedTopology: true, // mongodb connection options
    });
    db = client.db(dbName); // dive into our project database
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

function getDatabase() {
  return db; // load database instance to perform operations (in apis.js, the controllers)
}

module.exports = {
  mongodbConnect, // connect to db
  getDatabase, // load db instance
};
