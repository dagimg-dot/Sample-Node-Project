import { createServer } from "http";
import { parse } from "querystring";

import { readFile, writeFile } from "fs";

var users = [];
const server = createServer((req, res) => {
  if (req.method === "POST") {
    collectRequestData(req, (result) => {
      console.log(typeof result);

      users.push(result);
      // readFile()
      // appendFile('data.json', ',' + JSON.stringify(result,null,2), (err) => {
      writeFile("data.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          //   res.end('Error saving data to data.txt');
          console.log("cant append");
        } else {
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("Data saved to data.txt");
        }
      });
      console.log(result);
      res.end(`Parsed data belonging to ${result.fname}`);
    });
  } else if (req.url === "/") {
    readFile("SignUp.html", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error loading index.html");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.url === "/signin") {
    readFile("SignIn.html", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error loading index.html");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }
});
server.listen(5000);

function collectRequestData(request, callback) {
  const FORM_URLENCODED = "application/x-www-form-urlencoded";
  if (request.headers["content-type"] === FORM_URLENCODED) {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk.toString();
    });
    request.on("end", () => {
      callback(parse(body));
    });
  } else {
    callback(null);
  }
}