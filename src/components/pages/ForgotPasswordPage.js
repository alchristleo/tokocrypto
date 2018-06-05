import React from 'react';
import { Container } from 'reactstrap';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';

const ForgotPasswordPage = () => (
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
                        }}>Please input your email</h2>
                        <div className="card-body">
                            <ForgotPasswordForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Container>
);

export default ForgotPasswordPage;