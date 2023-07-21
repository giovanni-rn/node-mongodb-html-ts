const { mongodbConnect, getDatabase } = require("./server/database.js"); // database connection and database instance

module.exports.rootApi = (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" }); // add success status code and type for browser
  return res.end("Root URL, please fetch /api/users instead."); // display simple message on client side
};

module.exports.getUsers = (req, res) => {
  mongodbConnect().then(() => {
    const db = getDatabase(); // load database instance
    const usersCollection = db.collection("users"); // dive into users collection
    res.writeHead(200, { "Content-Type": "application/json" }); // set success status code and type for browser

    usersCollection
      .find({})
      .toArray()
      .then((users) => {
        return res.end(JSON.stringify(users)); // send array of all users to client
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  });
};

module.exports.postUser = (req, res) => {
  mongodbConnect().then(() => {
    const db = getDatabase(); // load database instance
    const usersCollection = db.collection("users"); // dive into users collection
    res.writeHead(201, { "Content-Type": "text/plain" }); // set success status code and type for browser

    let formData = "";
    req.on("data", (chunk) => {
      formData += chunk.toString();
    });

    req.on("end", () => {
      const parsedFormData = JSON.parse(formData); // parse form data sent from js fetch request
      const newUser = {
        name: parsedFormData.name,
        age: parsedFormData.age,
        email: parsedFormData.email,
      }; // get each field from client (html) form to insert them into users collection

      usersCollection
        .insertOne(newUser) // add user json to the users collection
        .then((result) => {
          // 'result' will contain information about the insertion, including the '_id' of the new document
          console.log("User added:", result.insertedId); // signals the user was added to the collection
          return res.end(JSON.stringify(result)); // send response to client to show it has worked
        })
        .catch((error) => {
          console.error("Error adding user:", error);
        });
    });
  });
};
