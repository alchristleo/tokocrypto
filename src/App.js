import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';
//import Loader from 'react-loader';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';
import HomePage from './components/pages/HomePage.js';
import LoginPage from './components/pages/LoginPage.js';
import RegisterPage from './components/pages/RegisterPage.js';
import DashboardPage from './components/pages/DashboardPage.js';
//import { fetchCurrentUserRequest } from "./actions/users";
import TopNavbar from './components/navigation/TopNavbar';

class App extends Component {
  // componentDidMount() {
  //   if (this.props.isAuthenticated) this.props.fetchCurrentUserRequest();
  // }

  render() {
    const { location, isAuthenticated } = this.props;
    return (
      <div>
          
            {isAuthenticated && <TopNavbar />}
            <Route location={location} path="/" exact component={HomePage} />
            <GuestRoute location={location} path="/login" exact component={LoginPage} />
            <GuestRoute location={location} path="/register" exact component={RegisterPage} />
            <UserRoute location={location} path="/dashboard" exact component={DashboardPage} />

      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  //isAuthenticated: PropTypes.bool.isRequired,
  //fetchCurrentUserRequest: PropTypes.func.isRequired,
  //loaded: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    //isAuthenticated: !!state.user.email,
    //loaded: state.user.loaded
  };
}

export default connect(mapStateToProps)(App);
