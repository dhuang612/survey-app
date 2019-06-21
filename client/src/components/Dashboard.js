import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';
class DashBoard extends Component {
  //in React we use Link tags instead of anchor
  render() {
    return (
      <div>
        <SurveyList />
        <div className="fixed-action-btn">
          <Link to="/surveys/new" className="btn-floating btn-large red">
            <i className="large material-icons">add</i>
          </Link>
        </div>
      </div>
    );
  }
}
export default DashBoard;
