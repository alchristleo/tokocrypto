import React from 'react';
import { Container, Button, Form } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ResetPasswordForm extends React.Component {
    state = {
        data: {
            newPassword: '',
            confirmPassword: ''
        },
        errors: {}
    }

    onChange = e => {
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });
    }

    onSubmit = e => {
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.props.submit(this.state.data);
        }
    }

    validate = data => {
        const errors = {};
        if (!data.newPassword) { errors.newPassword = "Password cant be blank!"; alert('Password cant be blank'); }
        else if (!data.confirmPassword) { errors.confirmPassword = "Confirmation password cant be blank!"; alert('Confirmation password cant be blank'); }
        else if (data.newPassword !== data.confirmPassword) {
            errors.newPassword = "Password not match!";
            errors.confirmPassword = "Password not match!";
            alert('Password cant be blank');
        }
        return errors;
    }

    render() {
        const { errors, data } = this.state;
        return (
            <Container>
                {errors.global && (
                    <div className="alert alert-danger">{errors.global}</div>
                )}
                <Form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="new-password">New Password</label>
                        <input
                            autoComplete="new-password"
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={data.newPassword}
                            onChange={this.onChange}
                            className={
                                errors.newPassword ? "form-control is-invalid" : "form-control"
                            }
                        />
                        <div className="invalid-feedback">{errors.newPassword}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input
                            autoComplete="new-password"
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={data.confirmPassword}
                            onChange={this.onChange}
                            className={
                                errors.confirmPassword ? "form-control is-invalid" : "form-control"
                            }
                        />
                        <div className="invalid-feedback">{errors.confirmPassword}</div>
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
}

ResetPasswordForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default connect()(ResetPasswordForm);