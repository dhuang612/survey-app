const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');
//creating a new route path to handle billing
module.exports = app => {
  //the route we are going down / middlewares //async
  app.post('/api/stripe', requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      source: req.body.id,
      description: '5 email surveys for 5 dollars'
    });
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};
