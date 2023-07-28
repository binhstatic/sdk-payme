const paymentSDK = require('./PayME');

async function makePayment() {
  try {
    const amount = 30000;
    const description = 'Payment for order #12345';
    const cardNumber = '9704001000000018';
    const cardHolder = 'NGUYEN VAN A';
    const issueDate = '03/07';

    const paymentResult = await paymentSDK.createPaymentOrder(
      amount,
      description,
      cardNumber,
      cardHolder,
      issueDate
    );

    console.log('Payment successful:', paymentResult);
  } catch (error) {
    console.error('Error making payment:', error);
  }
}

makePayment();
