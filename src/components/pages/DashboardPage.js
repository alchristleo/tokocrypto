import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader';
import { connect } from 'react-redux';
import { Container, Alert } from 'reactstrap';
import TableCrypto from '../crypto/TableCrypto';
import { fetchCurrCrypto, fetchCryptos } from '../../actions/cryptos';
import { fetchTransactions } from '../../actions/transactions';
import { allCryptosSelector } from "../../reducers/crypto";
import '../../styles/font.css';

class DashboardPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true,
            currCypto: '',
            loaded: true

        };

        this.onDismiss = this.onDismiss.bind(this);
    }

    componentWillMount = () => {
        this.setState({ loaded: false });
    }

    componentDidMount = () => {
        this.onInit(this.props);
        this.onInitCryptos(this.props);
        this.timer = setTimeout(() => this.setState({ loaded: true }), 3000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    onInit = (props) => props.fetchTransactions();
    onInitCryptos = (props) => props.fetchCryptos();

    onDismiss() {
        this.setState({ visible: false });
    }

    submit = data => {
        this.props.fetchCurrCrypto(data);
        this.setState({ currCrypto: data });
        this.props.history.push(`market/${data}`);
    }

    render() {
        const { loaded } = this.state;
        const { isConfirmed } = this.props;
        return (
            <div style={!isConfirmed ? { backgroundColor: "#42b549" } : { minHeight: "83vh" }}>
                {!isConfirmed ?
                    (<div className="container" style={{ height: "88vh" }}>
                        <div className="row align-items-center" style={{ height: "90vh" }}>
                            <div className="col col-xs-12 col-sm-8 col-sm-offset-2 col-lg-6 col-lg-offset-3">
                                <div className="card">
                                    <h2 className="card-header" style={{
                                        color: "#42b549"
                                    }}>tokocrypto</h2>
                                    <div className="card-body">
                                        <Alert color="warning">
                                            Please verify your email address.
                                    </Alert>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>) :
                    (<Loader loaded={loaded}><Container>
                        <Alert color="warning" isOpen={this.state.visible} toggle={this.onDismiss} style={{ marginTop: 20 }}>
                            <span style={{ background: "#428BCA", color: "#fff", fontWeight: "bold" }}>NOTICE</span> Digital Asset trading can be considered a high-risk activity, where Digital Asset prices are volatile, and can swing wildly, from day to day. Please use your extreme judgement when making the decision to invest in, or to sell, Digital Assets. TOKOCRYPTO is not soliciting for users to buy or sell Digital Assets, as an investment, or for profit. All Digital Asset trading decisions should be made independently by the user.
                            </Alert>
                        <h3 style={{ marginTop: 20 }}>IDR Market</h3>
                        <TableCrypto
                            submit={this.submit}
                        />
                    </Container></Loader>)
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
    cryptos: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired
    }).isRequired).isRequired,
};

function mapStateToProps(state) {
    return {
        cryptos: allCryptosSelector(state),
        isConfirmed: !!state.user.confirmed
    }
}

export default connect(mapStateToProps, { fetchCryptos, fetchCurrCrypto, fetchTransactions })(DashboardPage);