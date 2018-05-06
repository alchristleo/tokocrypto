import React from 'react';
import PropTypes from 'prop-types';
import {Container, Alert} from 'reactstrap';
import {connect} from 'react-redux';
import TopNavbar from '../navigation/TopNavbar';
import TableCrypto from '../crypto/TableCrypto';

class DashboardPage extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            visible: true
        };

        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss() {
        this.setState({ visible: false });
    }

    submit = data => this.props.history.push('market/BTC');


    render(){
        const { isAuthenticated } = this.props;

        return (
            <div>
                {isAuthenticated && <TopNavbar />}

                <Container>
                <Alert color="warning" isOpen={this.state.visible} toggle={this.onDismiss} style={{marginTop: 10}}>
                    <span style={{background: "#428BCA", color: "#fff", fontWeight: "bold"}}>NOTICE</span> Digital Asset trading can be considered a high-risk activity, where Digital Asset prices are volatile, and can swing wildly, from day to day. Please use your extreme judgement when making the decision to invest in, or to sell, Digital Assets. TOKOCRYPTO is not soliciting for users to buy or sell Digital Assets, as an investment, or for profit. All Digital Asset trading decisions should be made independently by the user.
                </Alert>
                    <h3 style={{marginTop:20}}>IDR Market</h3>
                    <TableCrypto
                        submit={this.submit}
                    />
                </Container>
            </div>
        );
    }
};

DashboardPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

function mapStateToProps(state){
    return {
        isAuthenticated: !!state.user.email
    }
}

export default connect(mapStateToProps)(DashboardPage);