const mongoose = require('mongoose');
//include in the survey schema
const Survey = mongoose.model('surveys');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    //we are using body parser
    const { title, subject, body, recipients } = req.body;

    //new instance of a survey
    const survey = new Survey({
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
    mailer.send();
  });
};
