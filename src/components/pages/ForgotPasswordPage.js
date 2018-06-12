import React from 'react';
import { connect } from 'react-redux';
import { Container, Alert } from 'reactstrap';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';

class ForgotPasswordPage extends React.Component {
    state = {
        isDone: false
    };

    onHandleSubmit = () => {
        this.setState({ isDone: true });
    }

    render() {
        const { isDone } = this.state;
        return (
            <Container
                fluid
                style={{
                    height: "100vh",
                    backgroundColor: "#42b549"
                }}
            >
                {!isDone && <div className="container" style={{ height: "100vh" }}>
                    <div className="row align-items-center" style={{ height: "100vh" }}>
                        <div className="col col-xs-12 col-sm-8 col-sm-offset-2 col-lg-6 col-lg-offset-3">
                            <div className="card">
                                <h2 className="card-header" style={{
                                    color: "#42b549"
                                }}>Please input your email</h2>
                                <div className="card-body">
                                    <ForgotPasswordForm onHandleSubmit={this.onHandleSubmit} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
                {isDone && <div className="container" style={{ height: "100vh" }}>
                    <div className="row align-items-center" style={{ height: "100vh" }}>
                        <div className="col col-xs-12 col-sm-8 col-sm-offset-2 col-lg-6 col-lg-offset-3">
                            <div className="card">
                                <h2 className="card-header" style={{
                                    color: "#42b549"
                                }}>tokocrypto</h2>
                                <div className="card-body">
                                    <Alert color="warning">
                                        Please kindly check your email address to reset your password.
                                    </Alert>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
            </Container>
        );
    };
};

function mapStateToProps(state) {
    return {
        formErrors: state.formErrors
    }
}

export default connect(mapStateToProps, {})(ForgotPasswordPage);