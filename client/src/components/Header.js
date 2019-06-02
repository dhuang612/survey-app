import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  //helper function
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Sign in with Google</a>
          </li>
        );
      default:
        return (
          <li>
            <a href="/api/logout">Sign out</a>
          </li>
        );
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a className="left brand-logo" href="/">
            Emaily
          </a>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}
function mapStateTopProps({ auth }) {
  return { auth };
}

export default connect(mapStateTopProps)(Header);
