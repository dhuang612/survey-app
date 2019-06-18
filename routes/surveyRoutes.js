const mongoose = require('mongoose');
//include in the survey schema
const Survey = mongoose.model('surveys');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

module.exports = app => {
  //added in a new route to return people who respond feedback
  app.get('/api/surveys/feedback', (req, res) => {
    res.send('Thanks for the feedback!');
  });
  app.post('/api/surveys/webhooks', (req, res) => {
    console.log(req.body);
    res.send({});
  });
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    //we are using body parser
    const { title, subject, body, recipients } = req.body;

    //new instance of a survey
    const survey = new Survey({
      //add in logic for redirect link after feedback.
      title,
      subject,
      body,
      //subdoc schema setup
      recipients: recipients.split(',').map(email => ({ email })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    //send an email out
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      //error checking
      //sends out the email survey
      await mailer.send();
      await survey.save();
      //once the email is sent out we charge a credit
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
/*

 (req, res) => {
      res.redirect('/surveys');
    }
*/
