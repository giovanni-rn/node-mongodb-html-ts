const http = require("node:http"); // load the library to create a server
const { rootApi, getMessages, postMessage } = require("./apis.js"); // api controllers

const hostname = "127.0.0.1"; // localhost address
const port = 3000; // server port

const server = http.createServer((req, res) => {
  // Set CORS headers to allow requests from any origin
  res.setHeader("Access-Control-Allow-Origin", [
    "http://127.0.0.1:5500",
    "http://127.0.0.1:5500/",
    "https://oriano-dev.github.io/one-piece-game/",
    "https://oriano-dev.github.io/one-piece-game",
  ]);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  // Handle endpoints (routes)
  if (req.url === "/") rootApi(req, res); // display simple message in client
  if (req.url === "/api/messages" && req.method === "GET")
    getMessages(req, res); // get messages infos
  if (req.url === "/api/messages" && req.method === "POST")
    postMessage(req, res); // add a message via html form and fetch request
});

server.listen(port, hostname, () => {
  // runs the server on localhost:3000
  console.log(`Server running at http://${hostname}:${port}/`); // message to display in console
});
