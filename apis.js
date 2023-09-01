const { mongodbConnect, getDatabase } = require("./database.js"); // database connection and database instance

module.exports.rootApi = (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" }); // add success status code and type for browser
  return res.end("Root URL, please fetch /api/messages instead."); // display simple message on client side
};

module.exports.getMessages = (req, res) => {
  mongodbConnect().then(() => {
    const db = getDatabase(); // load database instance
    const messagesCollection = db.collection("messages"); // dive into messages collection
    res.writeHead(200, { "Content-Type": "application/json" }); // set success status code and type for browser

    messagesCollection
      .find({})
      .toArray()
      .then((messages) => {
        return res.end(JSON.stringify(messages)); // send array of all messages to client
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  });
};

module.exports.postMessage = (req, res) => {
  mongodbConnect().then(() => {
    const db = getDatabase(); // load database instance
    const messagesCollection = db.collection("messages"); // dive into messages collection
    res.writeHead(201, { "Content-Type": "text/plain" }); // set success status code and type for browser

    let formData = "";
    req.on("data", (chunk) => {
      formData += chunk.toString();
    });

    req.on("end", () => {
      const parsedFormData = JSON.parse(formData); // parse form data sent from js fetch request
      const newMessage = {
        content: parsedFormData.content,
      }; // get each field from client (html) form to insert them into messages collection

      messagesCollection
        .insertOne(newMessage) // add message json to the messages collection
        .then((result) => {
          // 'result' will contain information about the insertion, including the '_id' of the new document
          console.log("Message added:", result.insertedId); // signals the message was added to the collection
          return res.end(JSON.stringify(result)); // send response to client to show it has worked
        })
        .catch((error) => {
          console.error("Error adding message:", error);
        });
    });
  });
};
