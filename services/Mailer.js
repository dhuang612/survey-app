//exports a class
const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

//Mailer inherited code from helper.Mail
class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    //es2015 syntax
    super();
    this.sgApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email('no-reply@emaily.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    //array of the helper email function that contains a list of recipients
    this.recipients = this.formatAddresses(recipients);
    //built in function to add the body of content to the email
    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }
  //helper functions
  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }
  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }
  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });
    const response = await this.sgApi.API(request);
    return response;
  }
}
module.exports = Mailer;
