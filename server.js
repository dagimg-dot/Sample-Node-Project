// import { createServer } from "http";
// import { parse } from "querystring";

import { readFile, writeFile } from "fs";

// var users = [];
// const server = createServer((req, res) => {
//   fetchUsers();
//   var isValid = false;
//   if (req.method === "POST") {
//     collectRequestData(req, (result) => {
//       if (result.email == undefined) {
//         for (let i = 0; i < users.length; i++) {
//           if (result.fname === users[i].fname) {
//             if (result.password === users[i].password) {
//               isValid = true;
//             } else {
//               isValid = false;
//             }
//           } else {
//             isValid = false;
//           }
//         }
//         if (isValid == true) {
//           res.end(`Welcome  to the system ${result.fname}`);
//           console.log("You are authenticated");
//         } else {
//           console.log("Incorrect credential has been inserted");
//         }
//       } else {
//         users.push(result);
//         writeFile("data.json", JSON.stringify(users, null, 2), (err) => {
//           if (err) {
//             res.writeHead(500, { "Content-Type": "text/plain" });
//             //   res.end('Error saving data to data.txt');
//             console.log("cant append");
//           } else {
//             res.writeHead(200, { "Content-Type": "text/plain" });
//             res.end("Data saved to data.txt");
//           }
//         });
//         console.log(result);
//         res.end(`Parsed data belonging to ${result.fname}`);
//       }
//     });
//   } else if (req.url === "/") {
//     readFile("SignUp.html", (err, data) => {
//       if (err) {
//         res.writeHead(500, { "Content-Type": "text/plain" });
//         res.end("Error loading index.html");
//       } else {
//         res.writeHead(200, { "Content-Type": "text/html" });
//         res.end(data);
//       }
//     });
//   } else if (req.url === "/signin") {
//     readFile("SignIn.html", (err, data) => {
//       if (err) {
//         res.writeHead(500, { "Content-Type": "text/plain" });
//         res.end("Error loading index.html");
//       } else {
//         res.writeHead(200, { "Content-Type": "text/html" });
//         res.end(data);
//       }
//     });
//   }
// });
// server.listen(5000);

// function collectRequestData(request, callback) {
//   const FORM_URLENCODED = "application/x-www-form-urlencoded";
//   if (request.headers["content-type"] === FORM_URLENCODED) {
//     let body = "";
//     request.on("data", (chunk) => {
//       body += chunk.toString();
//     });
//     request.on("end", () => {
//       callback(parse(body));
//     });
//   } else {
//     callback(null);
//   }
// }

var user = []

// function fetchUsers() {
//   readFile("data.json", (err, data) => {
//     if (err) {
//       console.log("Error opening the users file");
//     } else {
//       let parsed_data = JSON.parse(data);
//       for (let i = 0; i < parsed_data.length; i++) {
//         user.push(parsed_data[i]); 
//         console.log(parsed_data[i])
//       }
//     }
//   });
// }

readFile("data.json", 'utf-8',(err, data) => {
    if (err) {
      console.log("Error opening the users file");
    } else {
      let parsed_data = JSON.parse(data);
      for (let i = 0; i < parsed_data.length; i++) {
        let single = parsed_data[i]
        user.push(single); 
        console.log(user)
        // console.log(parsed_data[i])
      }
    }
});   
// fetchUsers()
// console.log(user);
