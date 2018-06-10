import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { validateTokenRequest } from '../../actions/auth';
import ResetPasswordForm from '../forms/ResetPasswordForm';

class ResetPasswordPage extends React.Component {
    state = {
        loading: true,
        success: false,
        isDone: false
    }

    componentDidMount() {
        this.props.validateTokenRequest(this.props.match.params.token)
            .then(() => this.setState({ loading: false, success: true }))
            .catch(() => this.setState({ loading: false, success: false }));
    }

    onSubmitStatus = () => {
        this.setState({ isDone: true });
    }

    render() {
        const { loading, success, isDone } = this.state;
        const token = this.props.match.params.token;
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
                        <div className="col col-xs-12 col-sm-8 offset-sm-2 col-lg-6 offset-lg-3">
                            {loading &&
                                <div className="card">
                                    <h2 className="card-header" style={{ color: "#42b549" }}>Loading...</h2>
                                </div>
                            }
                            {!loading && success &&
                                <div className="card">
                                    <h2 className="card-header" style={{ color: "#42b549" }}>Please input your new password</h2>
                                    <div className="card-body">
                                        <ResetPasswordForm token={token} onSubmitStatus={this.onSubmitStatus} />
                                    </div>
                                </div>
                            }
                            {!loading && !success &&
                                <div className="card">
                                    <Alert color="danger">Token invalid, please try again later</Alert>
                                </div>
                            }
                        </div>
                    </div>
                </div>}
                {isDone && <div className="container" style={{ height: "100vh" }}>
                    <div className="row align-items-center" style={{ height: "100vh" }}>
                        <div className="col col-xs-12 col-sm-8 offset-sm-2 col-lg-6 offset-lg-3">
                            <div className="card">
                                <h2 className="card-header" style={{
                                    color: "#42b549"
                                }}>tokocrypto</h2>
                                <div className="card-body">
                                    <Alert color="success">
                                        Success! You've successfully reset your password. Go to <Link to="/login">login</Link>
                                    </Alert>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
            </Container>
        );
    }
}

ResetPasswordPage.propTypes = {
    validateTokenRequest: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            token: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

export default connect(null, { validateTokenRequest })(ResetPasswordPage);