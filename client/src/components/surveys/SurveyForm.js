//shows the new survey
import React, { Component } from 'react';
//very similar setup to redux connect helper & allows us to talk to redux store!
import { reduxForm, Field } from 'redux-form';
//onSubmit below is passed to use directly from redux form we then call it and set it to submit

class SurveyForm extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          <Field type="text" name="SurveyTitle" component="input" />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyForm);
/*
 <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
  </form>
*/
