import React from 'react';
import {
    FormGroup, Label, Col, Input
} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import NumberFormat from 'react-number-format';

const array = window.location.href.split('market/');
const crSymbol = array[1];

class SellForm extends React.Component{
    state = {
        data: {
            idr: '',
            total: ''
        },
        cryptos: [],
        errors: {}
    };

    componentDidMount(){
        this.timer = setInterval(()=> this.getSelectecCrypto(), 1000)
    };

    onChange = (e) => 
        this.setState({
            data: {...this.state.data, [e.target.name]: e.target.value}
        });

    onSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        console.log(errors);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
        this.props
            .submit(this.state.data)
            .catch(err =>
            this.setState({ errors: err.response.data.errors})
            );
        }
    }

    async getSelectecCrypto(){
        fetch("/api/cryptos/current-crypto")
        .then(response => response.json())
        .then(data => this.setState({cryptos: data.cryptos}))
    }

    validate = data => {
        const errors = {};
        const {user} = this.props;
        if(!data.idr) errors.idr = alert("IDR input can't be blank!");
        if(data.idr > user.balance) errors.idr = alert("Input exceeding user balance!");
        return errors;
    }

    render(){
        const { user } = this.props;
        const { cryptos, errors, data } = this.state;

        return (
            <form onSubmit={this.onSubmit}>
            {errors.global && (
            <div className="alert alert-danger">{errors.global}</div>
            )}
            {cryptos.filter(x => x.symbol === crSymbol).map(item => (
            <div>
            <FormGroup row>
            <Label for="Balance" sm={3}>Balance: </Label>
            <Label sm={9}>{user.balance} {item.symbol}</Label>
            </FormGroup>

            <FormGroup row>
                <Label for="totalidr" sm={3}>Total {item.symbol}</Label>
                <Col sm={9}>
                    <Input type="idr" name="idr" id="idr" placeholder="" onChange={this.onChange} />
                </Col>
                <div className="invalid-feedback">{errors.idr}</div>
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
                <Label for="Total" sm={3}>Total {crSymbol}: </Label>
                <Label sm={9} value={data.idr * (item.price_usd * 13800)}><NumberFormat 
                        value={data.idr * (item.price_usd * 13800)} 
                        displayType={'text'} 
                        thousandSeparator={true} 
                        prefix={'IDR '} 
                        decimalScale={0}
                        /></Label>
            </FormGroup>
            </div>
            ))}
            <button type="submit" className="btn btn-primary btn-block" style={{
                backgroundColor: "#dc3545",
                border: "none"
            }}>
            Buy
            </button>
        </form>
        );
    }
}

SellForm.propTypes = {
    //submit: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.user,
        //cryptos: state.cryptos
    };
}

export default connect(mapStateToProps)(SellForm);