import React from 'react';
import PropTypes from 'prop-types';
import {Container, Col, Row} from 'reactstrap';
import {connect} from 'react-redux';
import TopNavbar from '../navigation/TopNavbar';
import DetailCrypto from '../crypto/DetailCrypto';
import BuyForm from '../forms/BuyForm';
import SellForm from '../forms/SellForm';
import { allCryptosSelector } from "../../reducers/crypto";
import { fetchCryptos } from '../../actions/cryptos';

const array = window.location.href.split('market/');
const crSymbol = array[1];

class BuySellPage extends React.Component{
    
    componentDidMount = () => this.onInit(this.props);
    
    onInit = (props) => props.fetchCryptos();
    submit = data => this.props.history.push("/dashboard");

    render(){
        const { isAuthenticated, cryptos } = this.props;

        return (
            <div>
                {isAuthenticated && <TopNavbar />}
                <Container>
                    <h3 style={{marginTop:20}}>{crSymbol}/IDR Market</h3>
                    
                    <DetailCrypto />
                    
                    <Row style={{marginTop:50}}>
                    <Col xs={12} sm={6}>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col col-xs-12 col-sm-12 col-lg-12">
                                <div className="card" style={{borderWidth: 3}}>
                                    <h2 className="card-header fontChange" style={{
                                        color: "#42b549", fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
                                    }}>Buy {crSymbol}</h2>
                                    <div className="card-body">
                                        <BuyForm />
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
                                <div className="card" style={{borderWidth: 3}}>
                                    <h2 className="card-header" style={{
                                        color: "#dc3545",  fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
                                    }}>Sell {crSymbol}</h2>
                                    <div className="card-body">
                                        <SellForm submit={this.submit} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </Col>
                    </Row>
                </Container>
            </div>
        );
    }
};

BuySellPage.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    fetchCryptos: PropTypes.func.isRequired,
    cryptos: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired
    }).isRequired).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
};

function mapStateToProps(state){
    return {
        isAuthenticated: !!state.user.email,
        cryptos: allCryptosSelector(state)
    }
}

export default connect(mapStateToProps, { fetchCryptos })(BuySellPage);