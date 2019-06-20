const keys = require('../../config/keys');
module.exports = survey => {
  //online tools available to make this look better
  return `
    <html>
      <body>
        <div style="text-align:center;">
        <h3>I'd like your input!</h3>
        <p> Please answer the following</p>
        <p>${survey.body}</p>
        <div>
        <a href="${keys.redirectDomain}/api/surveys/${survey.id}/Yes">Yes</a>
        </div>
        <div>
          <a href="${keys.redirectDomain}/api/surveys/${survey.id}/No">No</a>
        </div>
      </body>
    </html>
  `;
};
