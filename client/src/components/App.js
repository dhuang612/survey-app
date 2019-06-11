import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

//dummy route

class App extends Component {
  //is now considered the default method for adding ajax.
  componentDidMount() {
    //name of our action
    this.props.fetchUser();
  }
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={Dashboard} />
          <Route path="/surveys/new" component={SurveyNew} />
        </div>
      </BrowserRouter>
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
