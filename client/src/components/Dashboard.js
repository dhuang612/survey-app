import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class DashBoard extends Component {
  //in React we use Link tags instead of anchor
  render() {
    return (
      <div>
        DashBoard
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
