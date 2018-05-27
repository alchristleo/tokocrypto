import React from 'react';
import {
    FormGroup, Label, Col, Input
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import NumberFormat from 'react-number-format';
import { allTransactionsSelector } from '../../reducers/transaction';

class SellForm extends React.Component {
    state = {
        data: {
            totalget: 0,
            cyptocur: this.props.currCrypto.currCrypto,
        },
        data2: {
            totalget: '',
            cryptocur: this.props.currCrypto.currCrypto,
            totalidr: 0,
            type: 'sell'
        },
        cryptos: [],
        errors: {},
        currCryptoBalance: 0
    };

    componentDidMount() {
        this.getSelectecCrypto();
        this.timer = setInterval(() => this.getSelectecCrypto(), 300000);
        setInterval(() => this.getCurrentCryptoBalance(), 0);
    };

    onChange = (totalGet) => (e) =>
        this.setState({
            data2: { ...this.state.data2, totalidr: totalGet, [e.target.name]: e.target.value }
        });

    onSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate(this.state.data2);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.props
                .submit2(this.state.data2)
                .catch(err =>
                    this.setState({ errors: err.response.data.errors })
                );
        }
        this.cancelCourse2();
    }

    async getSelectecCrypto() {
        fetch("/api/cryptos/current-crypto")
            .then(response => response.json())
            .then(data => this.setState({ cryptos: data.cryptos }))
    }

    getCurrentCryptoBalance() {
        const taTempBuy = this.props.transactions.filter(item => item.type === 'buy' && item.cryptocur === this.props.currCrypto.currCrypto)
            .map(item => item.totalget);
        const tAmountBuy = taTempBuy.reduce(((sum, number) => sum + number), 0);
        const taTempSell = this.props.transactions.filter(item => item.type === 'sell' && item.cryptocur === this.props.currCrypto.currCrypto)
            .map(item => item.totalget);
        const tAmountSell = taTempSell.reduce(((sum, number) => sum + number), 0);
        this.setState({
            currCryptoBalance: tAmountBuy - tAmountSell
        })
    }

    cancelCourse2 = () => {
        this.myFormRefB.reset();
        this.setState({
            data2: {
                totalget: 0
            }
        })
    }

    validate = data2 => {
        const errors = {};
        if (this.state.currCryptoBalance === 0) {
            errors.totalget = `You dont have enough ${this.props.currCrypto.currCrypto} balance`;
            alert(`Your dont have enough ${this.props.currCrypto.currCrypto} balance`);
        } else if (data2.totalget === 0) {
            errors.totalget = "IDR input can't be blank!";
            alert("IDR input can't be blank!");
        } else if (data2.totalget > this.state.currCryptoBalance) {
            errors.totalget = `${this.props.currCrypto.currCrypto} input can't be greater than user ${this.props.currCrypto.currCrypto} balance `;
            alert(`${this.props.currCrypto.currCrypto} input can't be greater than user ${this.props.currCrypto.currCrypto} balance `);
        }
        return errors;
    }

    render() {
        const { currCrypto } = this.props;
        const { cryptos, data2, errors, currCryptoBalance } = this.state;
        let totalGet;
        for (let i = 0; i < cryptos.length; i++) {
            if (cryptos[i].symbol === currCrypto.currCrypto) {
                totalGet = cryptos.length > 0 ? (data2.totalget * (cryptos[i].price_usd * 13800)).toFixed(0) : 0;
            }
        }

        return (
            <form onSubmit={this.onSubmit} ref={(al) => this.myFormRefB = al}>
                {errors.global && (
                    <div className="alert alert-danger">{errors.global}</div>
                )}
                {cryptos.filter(x => x.symbol === currCrypto.currCrypto).map((item, index) => (
                    <div key={index}>
                        <FormGroup row>
                            <Label for="Balance" sm={3}>Balance: </Label>
                            <Label sm={9}>{currCryptoBalance ? (currCryptoBalance).toFixed(8) : 0} {item.symbol}</Label>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="totalget" sm={3}>Total {item.symbol}</Label>
                            <Col sm={9}>
                                <Input
                                    type="number"
                                    name="totalget"
                                    id="totalget"
                                    placeholder=""
                                    step="any"
                                    onChange={this.onChange(totalGet)} />
                            </Col>
                            <div className="invalid-feedback">{errors.totalget}</div>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="price" sm={3}>Price</Label>
                            <Label sm={9}><NumberFormat
                                value={item.price_usd * 13800}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'IDR '}
                                decimalScale={0}
                            /></Label>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="Total" sm={3}>Total IDR: </Label>
                            <Col sm={9}>
                                <Input type="text" name="totalidr" id="totalidr" value={totalGet} placeholder="" onChange={this.onChange} />
                            </Col>
                        </FormGroup>
                    </div>
                ))}
                <button type="submit" className="btn btn-primary btn-block" style={{
                    backgroundColor: "#dc3545",
                    border: "none"
                }}>
                    Sell
            </button>
            </form>
        );
    }
}

SellForm.propTypes = {
    submit2: PropTypes.func.isRequired,
    currCrypto: PropTypes.shape({
        currCrypto: PropTypes.string.isRequired,
    }).isRequired,
    transactions: PropTypes.arrayOf(PropTypes.shape({
    }).isRequired).isRequired,
};

function mapStateToProps(state) {
    return {
        user: state.user,
        currCrypto: state.currCrypto,
        transactions: allTransactionsSelector(state)
    };
}

export default connect(mapStateToProps)(SellForm);