const http = require('http');

const id = 19;

const options = {
  hostname: 'localhost',
  port: 3000,
  path: `/movimentacao/${id}`,
  method: 'DELETE',
};

const req = http.request(options, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Resposta:', data);
  });
});

req.on('error', error => console.error(error));
req.end();
