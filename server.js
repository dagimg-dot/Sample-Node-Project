import { createServer } from 'http';
import { parse } from 'querystring';

import { readFile, appendFile} from 'fs';


const server = createServer((req, res) => {
    if (req.method === 'POST') {
        collectRequestData(req, result => {
            console.log(typeof(result))
            // readFile()
            // appendFile('data.json', ',' + JSON.stringify(result,null,2), (err) => {
            appendFile('data.json', json_manipulator(result), (err) => {
                if (err) {
                  res.writeHead(500, { 'Content-Type': 'text/plain' });
                //   res.end('Error saving data to data.txt');
                    console.log('cant append')
                } else {
                  res.writeHead(200, { 'Content-Type': 'text/plain' });
                  res.end('Data saved to data.txt');
                }
              });
            console.log(result);
            res.end(`Parsed data belonging to ${result.fname}`);
        });
    } 
    else if (req.url === '/') {
        readFile('SignUp.html', (err, data) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error loading index.html');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
          }
        });
    }
});
server.listen(4000);

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

function json_manipulator(result) {
    readFile('data.json',(err,data) => {
        if (err) {
            console.log('cant read');
        }
        else {
            console.log('i am here')
            let parsed_object = JSON.parse(data);
            console.log(typeof(parsed_object))
            // let parsed = parse(data)
            // console.log(typeof(parsed))
            if (parsed_object.length == 0) {
                return JSON.stringify(result,null,2);
            }
            else {
                var newValue = data.toString().replace(']', '');
                writeFile('data.json', newValue,(err,data) => {
                    if (err) {
                        console.log('cant write');
                    }
                    else {
                        console.log(data)
                    }
                });
                return JSON.stringify(',' + result + ']',null,2);
            }
        }
    });
}