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
  app.get('/api/surveys', requireLogin, async (req, res) => {
    //because we are using req.user.id we want to make sure the user is signed in
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false
    });
    //once we have the code from our db we send it off as the requested info
    res.send(surveys);
  });
  //added in a new route to return people who respond feedback
  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for the feedback!');
  });
  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');
    _.chain(req.body)
      .filter(({ event, email, url }) => email && url && event === 'click')
      .map(({ url, email }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          //return an obj with the info we want
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            //mongodb syntax requires id with a _
            _id: surveyId,

            recipients: {
              $elemMatch: {
                email: email,
                responded: false
              }
            }
          },

          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true, lastResponded: new Date() }
          } //executes this mongo query
        ).exec();
      })
      .value();

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
