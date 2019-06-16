//shows the new survey
import React, { Component } from 'react';
import _ from 'lodash';
//very similar setup to redux connect helper & allows us to talk to redux store!
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
//onSubmit below is passed to use directly from redux form we then call it and set it to submit
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
//you can include a custom errors message by adding in a new value

import formFields from './formFields';
class SurveyForm extends Component {
  //helper method to render labels
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
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
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button className="teal btn-flat right white-text" type="submit">
            Next
            <i className="material-icons right ">done</i>
          </button>
        </form>
      </div>
    );
  }
}
function validate(values) {
  const errors = {};
  errors.emails = validateEmails(values.emails || '');
  _.each(formFields, ({ name }) => {
    //same as asking if (values.var === null || '')
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });
  return errors;
}
//redux form helper
export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
/*
 <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
  </form>
*/
