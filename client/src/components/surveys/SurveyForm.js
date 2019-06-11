//shows the new survey
import React, { Component } from 'react';
import _ from 'lodash';
//very similar setup to redux connect helper & allows us to talk to redux store!
import { reduxForm, Field } from 'redux-form';
//onSubmit below is passed to use directly from redux form we then call it and set it to submit
import SurveyField from './SurveyField';

const FIELDS = [
  { label: 'Survey Title', name: 'title' },
  { label: 'Subject Line', name: 'subject' },
  { label: 'Email Body', name: 'body' },
  { label: 'Recipient List', name: 'emails' }
];
class SurveyForm extends Component {
  //helper method to render labels
  renderFields() {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          {this.renderFields()}
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
