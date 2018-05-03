import React from 'react';
import {Container} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginForm from '../forms/LoginForm';
import { login } from '../../actions/auth';

import '../../styles/font.css';

class LoginPage extends React.Component{
    submit = data =>
        this.props.login(data).then(() => this.props.history.push("/dashboard"));

    render(){
        return (
            <Container
                fluid
                style={{
                    height: "100vh",
                    backgroundColor: "#42b549"
                }}
            >
                <div className="container" style={{ height: "100vh" }}>
                    <div className="row align-items-center" style={{ height: "100vh" }}>
                        <div className="col col-xs-12 col-sm-8 offset-sm-2 col-lg-6 offset-lg-3">
                            <div className="card">
                                <h2 className="card-header" style={{
                                    color: "#42b549"
                                }}>tokocrypto login</h2>
                                <div className="card-body">
                                    <LoginForm submit={this.submit} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

        );
    }
}

LoginPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    login: PropTypes.func.isRequired
};

export default connect(null, { login })(LoginPage);