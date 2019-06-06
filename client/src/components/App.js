import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

//dummy routes for testing.
import Header from './Header';
import Landing from './Landing';
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Surveytest = () => <h2>SurveyNew</h2>;

class App extends Component {
  //is now considered the default method for adding ajax.
  componentDidMount() {
    //name of our action
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

//we are using connect middleware to hand the node server request up to our front end
export default connect(
  null,
  actions
)(App);

/*
for BrowserRouter you use exact on the lowest common denominator 

*/
