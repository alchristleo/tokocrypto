import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Container } from 'reactstrap';
import PropTypes from 'prop-types';
import Validator from 'validator';
import { forgotPasswordRequest } from '../../actions/auth';

class ForgotPasswordForm extends React.Component {
    state = {
        data: {
            email: ''
        },
        errors: {}
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ errors: nextProps.fpErrors });
    }

    onChange = e => {
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });
    }

    onSubmit = e => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.props.submit(this.state.data);
            this.props.onHandleSubmit(this.state.data);
        }
    }

    validate = data => {
        const errors = {};
        if (!data.email) { errors.email = "Email cant be blank!"; alert('Email cant be blank!'); }
        else if (!Validator.isEmail(data.email)) { errors.email = "Wrong email format!"; alert('Wrong email format!'); }
        return errors;
    }

    render() {
        const { data, errors } = this.state;
        return (
            <Container>
                {errors.global && (
                    <div className="alert alert-danger">{errors.global}</div>
                )}
                <Form onSubmit={this.onSubmit}>
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

                    <Button type="submit" className="btn btn-primary btn-block" style={{
                        backgroundColor: "#ff5722",
                        border: "none"
                    }}>
                        Submit
                    </Button>
                </Form>
            </Container>
        );
    }
};

function mapStateToProps(state) {
    return {
        fpErrors: state.formErrors.forgot_password
    }
}

ForgotPasswordForm.propTypes = {
    submit: PropTypes.func.isRequired,
    onHandleSubmit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { submit: forgotPasswordRequest })(ForgotPasswordForm);