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
        <a href="http://localhost:3000">Yes</a>
        </div>
        <div>
          <a href="http://localhost:3000">No</a>
        </div>
      </body>
    </html>
  `;
};
