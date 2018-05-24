import React from "react";
import PropTypes from "prop-types";
import { Alert, Container } from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { confirm } from "../../actions/auth";

class ConfirmationPage extends React.Component {
    state = {
        loading: true,
        success: false
    };

    componentDidMount() {
        this.props
            .confirm(this.props.match.params.token)
            .then(() => this.setState({ loading: false, success: true }))
            .catch(() => this.setState({ loading: false, success: false }));
    }

    render() {
        const { loading, success } = this.state;

        return (
            <Container
                fluid
            >
                <div className="container" style={{ height: "100vh" }}>
                    <div className="row align-items-center" style={{ height: "20vh" }}>
                        <div className="col col-xs-12 col-sm-12 col-lg-12">
                            {loading && (
                                <Alert color="warning">
                                    Verifying your email.
                                </Alert>
                            )}

                            {!loading &&
                                success && (
                                    <Alert color="success">
                                        Thank you for verifying your email account. Go to <Link to="/dashboard">dashboard</Link>
                                    </Alert>
                                )}

                            {!loading &&
                                !success && (
                                    <Alert color="danger">
                                        You already verify your email. Go to <Link to="/dashboard">dashboard</Link>
                                    </Alert>
                                )}
                        </div>
                    </div>
                </div>
            </Container>
        );
    }
}

ConfirmationPage.propTypes = {
    confirm: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            token: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default connect(null, { confirm })(ConfirmationPage);