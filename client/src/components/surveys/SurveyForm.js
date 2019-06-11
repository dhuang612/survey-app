//shows the new survey
import React, { Component } from 'react';
import _ from 'lodash';
//very similar setup to redux connect helper & allows us to talk to redux store!
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
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
  if (!values.title) {
    errors.title = 'You must provide a title';
    console.log(errors);
  }
  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm'
})(SurveyForm);
/*
 <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
  </form>
*/
