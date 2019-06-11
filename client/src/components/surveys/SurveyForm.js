//shows the new survey
import React, { Component } from 'react';
//very similar setup to redux connect helper & allows us to talk to redux store!
import { reduxForm } from 'redux-form';

class SurveyForm extends Component {
  render() {
    return <div>SurveyForm</div>;
  }
}

export default reduxForm({
  form: 'surveyForm'
})(reduxForm);
