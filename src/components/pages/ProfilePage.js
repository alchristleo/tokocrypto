import React from 'react';
import {
    Container,
    Row,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import TransactionHistory from '../crypto/TransactionHistory';
import { fetchTransactions } from '../../actions/transactions';

class ProfilePage extends React.Component {
    componentDidMount = () => this.onInit(this.props);

    onInit = (props) => props.fetchTransactions();

    render() {
        return (
            <div>
                <Container style={{ minHeight: "83.10vh" }}>
                    <Row>
                        <h3 style={{ marginTop: 20 }}>Account History</h3>
                    </Row>
                    <Row style={{ marginTop: 20 }}>
                        <TransactionHistory />
                    </Row>
                    <div className="row text-center">
                        <div className="col col-xs-12 col-sm-12 col-lg-12">
                            <Link
                                to="/dashboard"
                                className="btn btn-primary btn-lg"
                                style={{
                                    marginTop: 20,
                                    backgroundColor: "#ff5722",
                                    border: "none",
                                    width: 200
                                }}
                            >
                                Back to Dashboard
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

ProfilePage.propTypes = {
    fetchTransactions: PropTypes.func.isRequired,
};

export default connect(null, { fetchTransactions })(ProfilePage);