import React from 'react';
import {Container} from 'reactstrap';
import LoginForm from '../forms/LoginForm';

import '../../styles/font.css';

class LoginPage extends React.Component{
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

export default LoginPage;