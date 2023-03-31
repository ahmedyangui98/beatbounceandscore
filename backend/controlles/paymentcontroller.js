// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

const stripe = require('stripe')('sk_test_51MqNgKDHyoI2TVWuA1hKm6ijBJbd587tiU2tjtYR7TIFC7j5MEOI74Z5wOczWXymsvnJAjh6kGwemqg6R6KHOEXH00bmMVI16c')


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