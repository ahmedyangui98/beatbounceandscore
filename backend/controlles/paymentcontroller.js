// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

const stripe = require('stripe')('sk_test_51MuFezE4ZELlhZxQ6LjSdJFOcQHEUYibATE8GNAdQOvhZnUGcIKb6QQaCeHt8McxvO0wTFvcdtWbVNGJO2oUCQgk00URF7YO5I')
const users = require("../model/user");
const payment = require("../model/paymentSchema");




exports.createPayment = async (req, res) => {
  const { amount,quizType,payment_method_types,payment_method_data,userId,description } = req.body;
 
  try {
    const stripePayment = await stripe.charges.create({
      customer: "cus_NfcWty189MHz5r",
      amount: amount ,
      currency: "usd",
      payment_method_types: payment_method_types,
      description: quizType,
      payment_method_data: payment_method_data,
    });

    const newPayment = new payment({
      amount: amount/100 ,
      quizType: quizType,
      userId: userId,
    });

    await newPayment.save();

    // const user = await users.findById(newPayment.userId);
    // console.log(userId)
    // user.payments.push(newPayment._id);
    // await user.save();

    res.json({ msg: "Payment Saved Successfully...!" });

  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }

}

exports.getPaymentsByType = async (req,res) => {
  try {
    const payments = await payment.findOne({ quizType: req.params.type, userId: req.params.id });
    // const result = await Results.findOne({_id:req.params.id});
    res.json(payments);

  } catch (err) {
    // console.error(err);
  }
};

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

exports.GetPayments = async (req, res) => {
//   try {
//     const payments = await payment.find();
//     res.status(200).send({ msg: "list of payments", payments });
//   } catch (error) {
//     res.status(500).send("couldn't get payments");
//   }
// };
  try {
    const payments = await payment.find();
    res.json(payments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
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