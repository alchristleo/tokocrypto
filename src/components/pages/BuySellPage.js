import React from "react";
import PropTypes from "prop-types";
import { Container, Col, Row } from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import DetailCrypto from "../crypto/DetailCrypto";
import BuyForm from "../forms/BuyForm";
import SellForm from "../forms/SellForm";
import AppChartBTC from '../crypto/crypto-chart/AppChartBTC';
import AppChartOthers from '../crypto/crypto-chart/AppChartOthers';
import { allCryptosSelector } from "../../reducers/crypto";
import { fetchCryptos } from "../../actions/cryptos";
import { createTransactions } from "../../actions/transactions";

class BuySellPage extends React.Component {
  state = {
    transaction: null
  };

  componentDidMount = () => {
    this.onInit(this.props);
  };

  onInit = props => props.fetchCryptos();

  addTransactions = transaction =>
    this.props
      .createTransactions(transaction)
      .then(this.setState({ transaction: transaction }));

  addTransactions2 = transaction => this.props.createTransactions(transaction);

  render() {
    const { currCrypto } = this.props;

    return (
      <div>
        <Container>
          <h3 style={{ marginTop: 20 }}>{currCrypto.currCrypto}/IDR Market</h3>

          <DetailCrypto transaction={this.state.transaction} />

          <Container style={{ marginTop: 50, marginBottom: 20 }}>
            {currCrypto.currCrypto === 'BTC' ? <AppChartBTC /> : <AppChartOthers />}
          </Container>

          <Row style={{ marginTop: 30 }}>
            <Col xs={12} sm={6}>
              <div className="container">
                <div className="row align-items-center">
                  <div className="col col-xs-12 col-sm-12 col-lg-12">
                    <div className="card" style={{ borderWidth: 3 }}>
                      <h2
                        className="card-header fontChange"
                        style={{
                          color: "#42b549",
                          fontFamily:
                            "Helvetica Neue, Helvetica, Arial, sans-serif"
                        }}
                      >
                        Buy {currCrypto.currCrypto}
                      </h2>
                      <div className="card-body">
                        <BuyForm
                          submit={this.addTransactions}
                          transaction={this.state.transaction}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="container">
                <div className="row align-items-center">
                  <div className="col col-xs-12 col-sm-12 col-lg-12">
                    <div className="card" style={{ borderWidth: 3 }}>
                      <h2
                        className="card-header"
                        style={{
                          color: "#dc3545",
                          fontFamily:
                            "Helvetica Neue, Helvetica, Arial, sans-serif"
                        }}
                      >
                        Sell {currCrypto.currCrypto}
                      </h2>
                      <div className="card-body">
                        <SellForm
                          submit2={this.addTransactions2}
                          transaction={this.state.transaction}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <div className="row text-center" style={{ marginTop: 20 }}>
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

BuySellPage.propTypes = {
  createTransactions: PropTypes.func.isRequired,
  fetchCryptos: PropTypes.func.isRequired,
  cryptos: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

function mapStateToProps(state) {
  return {
    cryptos: allCryptosSelector(state),
    currCrypto: state.currCrypto
  };
}

export default connect(mapStateToProps, { fetchCryptos, createTransactions })(
  BuySellPage
);
