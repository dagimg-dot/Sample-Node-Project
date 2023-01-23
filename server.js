import { createServer } from "http";
import { parse } from "querystring";

import { readFile, writeFile } from "fs";
import data from "./data.json" assert { type: "json" };

var users = [];
const server = createServer((req, res) => {
  fetchUsers();
  //   console.log(users);
  var isValid = false;
  if (req.method === "POST") {
    collectRequestData(req, (result) => {
      if (result.email == undefined) {
        for (let i = 0; i < users.length; i++) {
          if (result.fname === users[i].fname) {
            if (result.password === users[i].password) {
              isValid = true;
            } else {
              isValid = false;
            }
          } else {
            isValid = false;
          }
        }
        if (isValid == true) {
          res.end(`Welcome  to the system ${result.fname}`);
          console.log("You are authenticated");
        } else {
          console.log("Incorrect credential has been inserted");
        }
      } else {
        users.push(result);
        writeFile("data.json", JSON.stringify(users, null, 2), (err) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Error saving data to data.json");
            console.log("cant append");
          } else {
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("Data saved to data.json");
          }
        });
        console.log(result);
        res.end(`Parsed data belonging to ${result.fname}`);
      }
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

function fetchUsers() {
  for (let i = 0; i < data.length; i++) {
    users.push(data[i]);
  }
}
