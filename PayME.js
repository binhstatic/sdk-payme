const https = require('https');

const authorization =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzExNjUsImFjY291bnRJZCI6NiwibWVyY2hhbnRJZCI6MjIsImFjY291bnRUeXBlIjoiTUVSQ0hBTlQiLCJ0eXBlIjoiQVVUSE9SSVpFIiwiaWF0IjoxNjc2ODU3NjM4fQ.QzWT2o4GJ3zvGyEXQQpqMI1LG2o55K1Z1OL8ZaYKAyA';

function getToken(infoGetToken) {
  const requestBody = JSON.stringify(infoGetToken);
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
        if (data.code === 181000) {
          resolve(data.data);
        } else {
          reject(data);
        }
      });
    });

    req.write(requestBody);
    req.end();
  });
}

async function createPaymentOrder(
  partnerTransaction,
  ipnUrl,
  ip,
  redirectUrl,
  failedUrl,
  expiryTime,
  username,
  amount,
  desc,
  payMethod,
  cardNumber,
  cardHolder,
  issueDate
) {
  try {
    const infoGetToken = {
      partnerTransaction,
      ipnUrl,
      ip,
      redirectUrl,
      failedUrl,
      expiryTime,
      username,
    };
    const { token } = await getToken(infoGetToken);
    const paymentInfo = {
      token: token,
      amount,
      desc,
      payMethod,
      payData: {
        cardNumber,
        cardHolder,
        issueDate,
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

    return await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (body) => {
          const data = JSON.parse(body);
          if (data.code === 109300) {
            resolve(data);
          } else {
            reject(data);
          }
        });
      });
      req.write(requestBody);
      req.end();
    });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createPaymentOrder,
};
