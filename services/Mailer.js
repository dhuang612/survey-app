//exports a class
const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

//Mailer inherited code from helper.Mail
class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    //es2015 syntax
    super();
    this.from_email = new helper.Email('no-reply@emaily.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.fromatAddresses(recipients);
  }
}
module.exports = Mailer;
