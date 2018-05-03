import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import { createUserRequest } from "../../actions/users";

class RegisterForm extends React.Component {
    state = {
        data: {
            email: "",
            username: "",
            password: ""
    },
        errors: {}
    };

    componentWillReceiveProps(nextProps) {
        this.setState({ errors: nextProps.serverErrors });
    }

    onChange = e =>
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
    });

    onSubmit = e => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.props.submit(this.state.data);
        }
    };

    validate = data => {
        const errors = {};

        if (!isEmail(data.email)) errors.email = "Invalid email";
        if (!data.password) errors.password = "Can't be blank";
        if (!data.username) errors.username = "Can't be blank";

        return errors;
    };

    render() {
        const { data, errors } = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    autoComplete="email"
                    type="email"
                    id="email"
                    name="email"
                    value={data.email}
                    onChange={this.onChange}
                    className={
                    errors.email ? "form-control is-invalid" : "form-control"
                    }
                />
                <div className="invalid-feedback">{errors.email}</div>
                </div>

                <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    autoComplete="username"
                    type="text"
                    id="username"
                    name="username"
                    value={data.username}
                    onChange={this.onChange}
                    className={
                    errors.username ? "form-control is-invalid" : "form-control"
                    }
                />
                <div className="invalid-feedback">{errors.username}</div>
                </div>

                <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    autoComplete="current-password"
                    type="password"
                    id="password"
                    name="password"
                    value={data.password}
                    onChange={this.onChange}
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
                Register
                </button>

                <small className="form-text text-center">
                or <Link to="/login">Login</Link> if you have an account
                </small>
            </form>
        );
    }
};

function mapStateToProps(state) {
    return {
        serverErrors: state.formErrors.register
    };
}

RegisterForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { submit: createUserRequest })(
    RegisterForm
);
