import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Loader from 'react-loader';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import ConfirmationPage from './components/pages/ConfirmationPage';
import DashboardPage from './components/pages/DashboardPage';
import BuySellPage from './components/pages/BuySellPage';
import ProfilePage from './components/pages/ProfilePage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage';
import { fetchCurrentUserRequest } from "./actions/users";
import TopNavbar from './components/navigation/TopNavbar';
import Footer from './components/navigation/Footer';

class App extends Component {
  componentDidMount() {
    if (this.props.isAuthenticated) this.props.fetchCurrentUserRequest();
  }

  render() {
    const { location, isAuthenticated, loaded } = this.props;
    return (
      <div>
        <Loader loaded={loaded}>
          {isAuthenticated && <TopNavbar />}
          <Route location={location} path="/" exact component={HomePage} />
          <Route location={location} path="/confirmation/:token" exact component={ConfirmationPage} />
          <Route location={location} path="/forgot_password" exact component={ForgotPasswordPage} />
          <GuestRoute location={location} path="/reset_password/:token" exact component={ResetPasswordPage} />
          <GuestRoute location={location} path="/login" exact component={LoginPage} />
          <GuestRoute location={location} path="/register" exact component={RegisterPage} />
          <UserRoute location={location} path="/dashboard" exact component={DashboardPage} />
          <UserRoute location={location} path="/market/:query" exact component={BuySellPage} />
          <UserRoute location={location} path="/account/history" exact component={ProfilePage} />
          {isAuthenticated && <Footer />}
        </Loader>
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  fetchCurrentUserRequest: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email,
    loaded: state.user.loaded
  };
}

export default connect(mapStateToProps, { fetchCurrentUserRequest })(App);
