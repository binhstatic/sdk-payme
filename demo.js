const paymentSDK = require('./PayME');

async function makePayment() {
  try {
    const partnerTransaction = '13233123123';
    const ipnUrl = 'google.com';
    const ip = '127.0.0.1';
    const redirectUrl = 'google.com/r';
    const failedUrl = 'google.com/f';
    const expiryTime = 20;
    const username = 'vanbinh';

    const amount = 30000;
    const des = 'Payment for order #13112000';
    const payMEthod = 'ATMCARD';
    const cardNumber = '9704001000000018';
    const cardHolder = 'NGUYEN VAN A';
    const issueDate = '03/07';

    const paymentResult = await paymentSDK.createPaymentOrder(
      partnerTransaction,
      ipnUrl,
      ip,
      redirectUrl,
      failedUrl,
      expiryTime,
      username,
      amount,
      des,
      payMEthod,
      cardNumber,
      cardHolder,
      issueDate
    );

    console.log('Payment successful:', paymentResult);
  } catch (error) {
    console.log('Error making payment:', error);
  }
}

makePayment();
