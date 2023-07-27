const https = require('https');

const authorization =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzExNjUsImFjY291bnRJZCI6NiwibWVyY2hhbnRJZCI6MjIsImFjY291bnRUeXBlIjoiTUVSQ0hBTlQiLCJ0eXBlIjoiQVVUSE9SSVpFIiwiaWF0IjoxNjc2ODU3NjM4fQ.QzWT2o4GJ3zvGyEXQQpqMI1LG2o55K1Z1OL8ZaYKAyA';

/// get token ///
const defaultValueGetToken = {
  partnerTransaction: '342314s133124354234',
  ipnUrl: 'google.com',
  ip: '127.0.0.1',
  redirectUrl: 'google.com/r',
  failedUrl: 'google.com/f',
  expiryTime: 20,
  username: 'vutp',
};

function getToken(params) {
  const requestBody = JSON.stringify(defaultValueGetToken);
  const options = {
    hostname: 'dev-gapi.payme.net.vn',
    path: '/sdk',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization,
    },
  };
  const req = https.request(options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (body) => {
      var data = JSON.parse(body);
      console.log('data', data);
    });

    req.write(requestBody);
    req.end();
  });
}

/// payment ///

var token = '';
var amount = 30000;
var desc = 'mo ta';
var payMethod = 'ATMCARD';
var payData = {
  cardNumber: 9704001000000018,
  cardHolder: 'NGUYEN VAN A',
  issueDate: '03/07',
};
var language = 'vi';
