import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Alert } from 'reactstrap';
import TableCrypto from '../crypto/TableCrypto';
import { fetchCurrCrypto } from '../../actions/cryptos';
import { fetchTransactions } from '../../actions/transactions';

class DashboardPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true,
            currCypto: ''
        };

        this.onDismiss = this.onDismiss.bind(this);
    }

    componentDidMount = () => this.onInit(this.props);

    onInit = (props) => props.fetchTransactions();

    onDismiss() {
        this.setState({ visible: false });
    }

    submit = data => {
        this.props.fetchCurrCrypto(data);
        this.setState({ currCrypto: data });
        this.props.history.push(`market/${data}`);
    }


    render() {
        const { isConfirmed } = this.props;

        return (
            <div>
                {!isConfirmed ?
                    (<Container style={{ marginTop: 40 }}>
                        <Alert color="warning" isOpen={this.state.visible} toggle={this.onDismiss} style={{ marginTop: 10 }}>
                            Please kindly confirm your email address!
                </Alert>
                    </Container>) :
                    (<Container>
                        <Alert color="warning" isOpen={this.state.visible} toggle={this.onDismiss} style={{ marginTop: 10 }}>
                            <span style={{ background: "#428BCA", color: "#fff", fontWeight: "bold" }}>NOTICE</span> Digital Asset trading can be considered a high-risk activity, where Digital Asset prices are volatile, and can swing wildly, from day to day. Please use your extreme judgement when making the decision to invest in, or to sell, Digital Assets. TOKOCRYPTO is not soliciting for users to buy or sell Digital Assets, as an investment, or for profit. All Digital Asset trading decisions should be made independently by the user.
                </Alert>
                        <h3 style={{ marginTop: 20 }}>IDR Market</h3>
                        <TableCrypto
                            submit={this.submit}
                        />
                    </Container>)
                }
            </div>
        );
    }
};

DashboardPage.propTypes = {
    isConfirmed: PropTypes.bool.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    fetchCurrCrypto: PropTypes.func.isRequired,
    fetchTransactions: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        isConfirmed: !!state.user.confirmed
    }
}

export default connect(mapStateToProps, { fetchCurrCrypto, fetchTransactions })(DashboardPage);