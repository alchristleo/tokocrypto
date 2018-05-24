import React from 'react';
import {
    FormGroup, Label, Col, Input
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import NumberFormat from 'react-number-format';

const array = window.location.href.split('market/');
const crSymbol = array[1];

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
        errors: {}
    };

    componentDidMount() {
        this.getSelectecCrypto();
        this.timer = setInterval(() => this.getSelectecCrypto(), 300000)
    };

    componentWillReceiveProps(props) {
        this.setState({
            data: {
                totalget: props.transaction.totalget,
            }
        })
    }

    onChange = (totalGet) => (e) =>
        this.setState({
            data2: { ...this.state.data2, totalidr: totalGet, [e.target.name]: e.target.value }
        });

    onSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate(this.state.data2);
        // this.setState({data2: {
        //     totalcur: currVal,
        //     cryptocur: crSymbol,
        //     totalidr: totalGet,
        //     type: 'sell'
        // }});
        this.setState({ errors });
        console.log(this.state.data2);
        if (Object.keys(errors).length === 0) {
            this.props
                .submit2(this.state.data2)
                .catch(err =>
                    this.setState({ errors: err.response.data.errors })
                );
        }
        this.cancelCourse();
    }

    async getSelectecCrypto() {
        fetch("/api/cryptos/current-crypto")
            .then(response => response.json())
            .then(data => this.setState({ cryptos: data.cryptos }))
    }

    cancelCourse = () => {
        this.myFormRefB.reset();
    }

    validate = data2 => {
        const errors = {};
        if (this.state.data.totalget === 0) { alert(`Your dont have enough ${crSymbol} balance`); }
        else if (data2.totalget === 0) { alert("IDR input can't be blank!"); }
        else if (data2.totalget > this.state.data.totalget) { alert(`${crSymbol} input can't be greater than user ${crSymbol} balance `); }
        return errors;
    }

    render() {
        const { currCrypto } = this.props;
        const { cryptos, data, data2, errors } = this.state;
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
                            <Label sm={9}>{data.totalget ? (data.totalget).toFixed(8) : 0} {item.symbol}</Label>
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
    transaction: PropTypes.shape({
        totalget: PropTypes.number.isRequired,
        cryptocur: PropTypes.string.isRequired,
    }).isRequired,
    currCrypto: PropTypes.shape({
        currCrypto: PropTypes.string.isRequired,
    }).isRequired,
};

function mapStateToProps(state) {
    return {
        user: state.user,
        currCrypto: state.currCrypto
        //cryptos: state.cryptos
    };
}

export default connect(mapStateToProps)(SellForm);