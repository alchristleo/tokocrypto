import React from 'react';
import PropTypes from 'prop-types';
import {Container, Col, Row} from 'reactstrap';
import {connect} from 'react-redux';
import DetailCrypto from '../crypto/DetailCrypto';
import BuyForm from '../forms/BuyForm';
import SellForm from '../forms/SellForm';
import { allCryptosSelector } from "../../reducers/crypto";
import { fetchCryptos } from '../../actions/cryptos';
import { createTransactions } from '../../actions/transactions';

const array = window.location.href.split('market/');
const crSymbol = array[1];
const path = `/market/${crSymbol}`;
//console.log(path);

class BuySellPage extends React.Component{
    state = {
		transaction: null
	};
    
    componentDidMount = () => this.onInit(this.props);
    
    onInit = (props) => props.fetchCryptos();
    
    addTransactions = (transaction) => 
        this.props.createTransactions(transaction)
        .then(() => this.props.history.push(path))
        .then(this.setState({transaction: transaction}));

    render(){
        const { cryptos } = this.props;

        return (
            <div>
                <Container>
                    <h3 style={{marginTop:20}}>{crSymbol}/IDR Market</h3>
                    
                    <DetailCrypto transaction={this.state.transaction} />
                    
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
                                        <BuyForm 
                                        submit={this.addTransactions} 
                                        transaction={this.state.transaction}/>
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
    createTransactions: PropTypes.func.isRequired,
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
        cryptos: allCryptosSelector(state)
    }
}

export default connect(mapStateToProps, { fetchCryptos, createTransactions })(BuySellPage);
