import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import { Link } from "react-router-dom";

import '../../styles/font.css';

class HomePage extends React.Component{
    render(){
        return (
            <Container 
                fluid
                style={{
                    height: "100vh",
                    color: "white",
                    backgroundColor: "#42b549"
                }}
            >
                <Row
                    className="align-items-center justify-content-center text-center"
                    style={{ height: "100%" }}
                >
                    <Col xs={12} sm={6}>
                        <img
                        className="img-fluid"
                        alt="Adventurers League Logo"
                        src="https://ecs7.tokopedia.net/img/product-1/2017/6/2/747897/747897_6c4c243b-eaeb-487c-97ed-13d569c21df2_800_800.png"
                        style={{ height: "50%", width: "50%"}}
                        />
                        <h1
                        style={{
                            lineHeight: "3rem"
                        }}
                        >
                        tokocrypto
                        </h1>
                        <div className="text-center">
                            <Link
                                to="/login"
                                className="btn btn-primary btn-lg"
                                style={{
                                    marginTop: 20,
                                    backgroundColor: "#ff5722",
                                    border: "none",
                                    width: 200
                                }}
                            >
                                Login
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
};

export default HomePage;