const https = require('https');

const authorization =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzExNjUsImFjY291bnRJZCI6NiwibWVyY2hhbnRJZCI6MjIsImFjY291bnRUeXBlIjoiTUVSQ0hBTlQiLCJ0eXBlIjoiQVVUSE9SSVpFIiwiaWF0IjoxNjc2ODU3NjM4fQ.QzWT2o4GJ3zvGyEXQQpqMI1LG2o55K1Z1OL8ZaYKAyA';

/// get token ///

const defaultValueGetToken = {
  partnerTransaction: '342313213312e24234',
  ipnUrl: 'google.com',
  ip: '127.0.0.1',
  redirectUrl: 'google.com/r',
  failedUrl: 'google.com/f',
  expiryTime: 20,
  username: 'vutp',
};

function getToken() {
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

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      res.setEncoding('utf8');
      res.on('data', (body) => {
        const data = JSON.parse(body);
        console.log('getToken()', data);
        resolve(data.data.token);
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(requestBody);
    req.end();
  });
}

/// payment ///

async function payment() {
  try {
    const token = await getToken();
    const paymentInfo = {
      token: token,
      amount: 30000,
      desc: 'mo ta',
      payMethod: 'ATMCARD',
      payData: {
        cardNumber: '9704001000000018',
        cardHolder: 'NGUYEN VAN A',
        issueDate: '03/07',
      },
    };
    const requestBody = JSON.stringify(paymentInfo);
    const options = {
      hostname: 'dev-gapi.payme.net.vn',
      path: '/fe/payment/sdk',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const data = await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve(JSON.parse(data));
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.write(requestBody);
      req.end();
    });
    console.log('payment()', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

payment();
