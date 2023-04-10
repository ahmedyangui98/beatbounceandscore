// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

const stripe = require('stripe')('sk_test_51MuFezE4ZELlhZxQ6LjSdJFOcQHEUYibATE8GNAdQOvhZnUGcIKb6QQaCeHt8McxvO0wTFvcdtWbVNGJO2oUCQgk00URF7YO5I')



exports.createPayment = async (req, res) => {
  const { amount,description,payment_method_types,payment_method_data,confirmation_method,payment_user_agent } = req.body;
 
  try {
    await stripe.charges.create({
      customer: "cus_NfcWty189MHz5r",
      amount: amount*100,
      currency: "usd",
      payment_method_types:payment_method_types,
      description:description,
      payment_method_data:payment_method_data,

    });
    res.json({ msg : "payment success !!"});

  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }

}


exports.checkoutSession = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Sport Course/Quiz',
          },
          unit_amount: 30,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
   // success_url: 'http://localhost:4242/success',
   // cancel_url: 'http://localhost:4242/cancel',
  });

  res.json({ msg : "payment success !!"});

}





/* exports.checkoutSession = async (req, res) => {
    try {

        let intent = await stripe.paymentIntents.create({
          payment_method: "test",
          description: "Test payment",
          amount: 100,
          currency: 'usd',
          confirmation_method: 'manual',
          confirm: true
        });
        
        res.send(GenerateResponse(intent));
        
      } catch (e) {
        return res.send({ error: e.message });
      }
      
}  */