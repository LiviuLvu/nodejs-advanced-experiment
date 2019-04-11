const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>NodeJS Form</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send to File</button></form></body>');
    res.write('</html>');
    res.end();
  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk)=>{
    body.push(chunk);
    });

    req.on('end', () => {
    const parsedBody = Buffer.concat(body).toString();
    const message = parsedBody.split('=')[0];
    
    fs.writeFile('message.txt', message, (err) => {
      err ? console.log`${err}` : console.log`Succesful Write`;
      res.statusCode = 302;
      res.setHeader('Location', '/');
      return res.end();
      });
    });
  }
}

module.exports = requestHandler;