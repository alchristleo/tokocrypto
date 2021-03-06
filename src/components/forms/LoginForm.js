import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Validator from "validator";
import { userLoginRequest } from "../../actions/auth";

class LoginForm extends React.Component {
    state = {
        data: {
            email: "",
            password: ""
        },
        errors: {}
    };

    componentWillReceiveProps(nextProps) {
        this.setState({ errors: nextProps.serverErrors });
    }

    onChange = (e) =>
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });

    onSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.props
                .submit(this.state.data)
        }
    }

    validate = data => {
        const errors = {};
        if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
        if (!data.password) errors.password = "Invalid password";
        return errors;
    }

    render() {
        const { data, errors } = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                {errors.global && (
                    <div className="alert alert-danger">{errors.global}</div>
                )}

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={data.email}
                        onChange={this.onChange}
                        autoComplete="email"
                        className={
                            errors.email ? "form-control is-invalid" : "form-control"
                        }
                    />
                    <div className="invalid-feedback">{errors.email}</div>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={data.password}
                        onChange={this.onChange}
                        autoComplete="password"
                        className={
                            errors.password ? "form-control is-invalid" : "form-control"
                        }
                    />
                    <div className="invalid-feedback">{errors.password}</div>
                </div>

                <button type="submit" className="btn btn-primary btn-block" style={{
                    backgroundColor: "#ff5722",
                    border: "none"
                }}>
                    Login
            </button>

                <small className="form-text text-center">
                    <Link to="/register">Register</Link> if you don't have an account<br />
                    <Link to="/forgot_password">Forgot Password?</Link>
                </small>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        serverErrors: state.formErrors.login
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { submit: userLoginRequest })(LoginForm);