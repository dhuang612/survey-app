const keys = require('../config/keys');

const stripe = require('stripe')(keys.stripeSecretKey);

//creating a new route path to handle billing
module.exports = app => {
  app.post('/api/stripe', async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      source: req.body.id,
      description: '5 email surveys for 5 dollars'
    });
    console.log(charge);
  });
};
