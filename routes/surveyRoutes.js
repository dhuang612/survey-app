const _ = require('lodash');
const Path = require('path-parser').default;
//comes with node js
const { URL } = require('url');
const mongoose = require('mongoose');
//include in the survey schema
const Survey = mongoose.model('surveys');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

module.exports = app => {
  //added in a new route to return people who respond feedback
  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for the feedback!');
  });
  app.post('/api/surveys/webhooks', (req, res) => {
    const events = _.map(req.body, ({ url, email }) => {
      const pathname = new URL(url).pathname;
      //survey id and path new parser
      const p = new Path('/api/surveys/:surveyId/:choice');
      const match = p.test(pathname);
      if (match) {
        //return an obj with the info we want
        return { email, surveyId: match.surveyId, choice: match.choice };
      }
    });
    const compactEvents = _.compact(events);
    const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');
    console.log(uniqueEvents);
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
