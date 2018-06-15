import React from 'react';
import {
    FormGroup, Label, Col, Input
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import NumberFormat from 'react-number-format';
import { allTransactionsSelector } from '../../reducers/transaction';

class BuyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                cryptocur: this.props.currCrypto.currCrypto,
                totalidr: 0,
                totalget: '',
                type: 'buy'
            },
            balance: 0,
            cryptos: [],
            errors: {},
        };
    };

    componentDidMount() {
        this.getSelectecCrypto();
        this.timer = setInterval(() => this.getSelectecCrypto(), 300000);
        setInterval(() => this.getCurrentBalance(), 0);
    };

    componentWillReceiveProps(props) {
        const taTempBuy = this.props.transactions.filter(item => item.type === 'buy')
            .map(item => item.totalidr);
        const tAmountBuy = taTempBuy.reduce(((sum, number) => sum + number), 0);
        const taTempSell = this.props.transactions.filter(item => item.type === 'sell')
            .map(item => item.totalidr);
        const tAmountSell = taTempSell.reduce(((sum, number) => sum + number), 0);
        this.setState({
            balance: this.props.user.balance - (tAmountBuy - tAmountSell)
        })
    }

    onChange = (totalGet) => (e) =>
        this.setState({
            data: { ...this.state.data, totalget: totalGet * 10, [e.target.name]: e.target.value }
        });

    onSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.props
                .submit(this.state.data)
                .catch(err =>
                    this.setState({ errors: err.response.data.errors })
                );
        }
        this.setState({
            data: {
                cryptocur: this.props.currCrypto.currCrypto,
                totalidr: 0,
                totalget: '',
                type: 'buy'
            }
        });
        this.cancelCourse();
    }

    async getSelectecCrypto() {
        fetch("/api/cryptos/current-crypto")
            .then(response => response.json())
            .then(data => this.setState({ cryptos: data.cryptos }))
    }

    getCurrentBalance() {
        const taTempBuy = this.props.transactions.filter(item => item.type === 'buy')
            .map(item => item.totalidr);
        const tAmountBuy = taTempBuy.reduce(((sum, number) => sum + number), 0);
        const taTempSell = this.props.transactions.filter(item => item.type === 'sell')
            .map(item => item.totalidr);
        const tAmountSell = taTempSell.reduce(((sum, number) => sum + number), 0);
        this.setState({
            balance: this.props.user.balance - (tAmountBuy - tAmountSell)
        })
    }

    cancelCourse = () => {
        this.myFormRef.reset();
    }

    validate = data => {
        const errors = {};
        if (!data.totalidr) {
            errors.idr = "IDR input can't be blank!";
            alert("IDR input can't be blank!");
        } else if (data.totalidr > this.state.balance) {
            errors.idr = "Input exceeding user balance!";
            alert("Input exceeding user balance!");
        } else if (isNaN(data.totalidr)) {
            errors.idr = "Input must be number!";
            alert("Input must be number");
        }
        return errors;
    }

    render() {
        const { currCrypto, currKurs } = this.props;
        const { cryptos, errors, data, balance } = this.state;
        let totalGet;
        for (let i = 0; i < cryptos.length; i++) {
            if (cryptos[i].symbol === currCrypto.currCrypto) {
                totalGet = cryptos.length > 0 ? (data.totalidr / (cryptos[i].price_usd * currKurs.currKurs)).toFixed(9) : 0;
            }
        }

        return (
            <form onSubmit={this.onSubmit} ref={(el) => this.myFormRef = el}>
                {errors.global && (
                    <div className="alert alert-danger">{errors.global}</div>
                )}
                {cryptos.filter(x => x.symbol === currCrypto.currCrypto).map((item, index) => (
                    <div key={index}>
                        <FormGroup row>
                            <Label for="Balance" sm={3}>Balance: </Label>
                            <Label sm={9}><NumberFormat
                                value={balance}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'IDR '}
                                decimalScale={0}
                            /></Label>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="totalidr" sm={3}>Total IDR</Label>
                            <Col sm={9}>
                                <Input
                                    ref={(ref) => this.mainInput = ref}
                                    type="number"
                                    name="totalidr"
                                    id="totalidr"
                                    placeholder=""
                                    onChange={this.onChange(totalGet)} />
                            </Col>
                            <div className="invalid-feedback">{errors.idr}</div>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="price" sm={3}>Price</Label>
                            <Label sm={9}><NumberFormat
                                value={item.price_usd * currKurs.currKurs}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'IDR '}
                                decimalScale={0}
                            /></Label>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="cryptoGet" sm={3}>Total {currCrypto.currCrypto}: </Label>
                            <Col sm={9}>
                                <Input type="text" name="totalget" id="totalget" value={totalGet} placeholder="" onChange={this.onChange} />
                            </Col>
                        </FormGroup>
                    </div>
                ))}
                <button type="submit" className="btn btn-primary btn-block" style={{
                    backgroundColor: "#42b549",
                    border: "none"
                }}>
                    Buy
            </button>
            </form>
        );
    }
}

BuyForm.propTypes = {
    submit: PropTypes.func.isRequired,
    currCrypto: PropTypes.shape({
        currCrypto: PropTypes.string.isRequired,
    }).isRequired,
    currKurs: PropTypes.shape({
        currKurs: PropTypes.number.isRequired,
    }).isRequired,
    transactions: PropTypes.arrayOf(PropTypes.shape({
    }).isRequired).isRequired,
    user: PropTypes.shape({
        email: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
    }).isRequired,
};

function mapStateToProps(state) {
    return {
        user: state.user,
        currCrypto: state.currCrypto,
        currKurs: state.currKurs,
        transactions: allTransactionsSelector(state)
    };
}

export default connect(mapStateToProps, {})(BuyForm);