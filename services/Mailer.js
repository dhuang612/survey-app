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
    //array of the helper email function that contains a list of recipients
    this.recipients = this.formatAddresses(recipients);
    //built in function to add the body of content to the email
    this.addContent(this.body);
    this.addClickTracking();
  }
  //helper functions
  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.clickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }
}
module.exports = Mailer;
