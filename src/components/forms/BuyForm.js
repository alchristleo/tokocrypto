import React from 'react';
import {
    FormGroup, Label, Col, Input
} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import NumberFormat from 'react-number-format';

const array = window.location.href.split('market/');
const crSymbol = array[1];

class BuyForm extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            data: {
                cryptocur: crSymbol,
                totalidr: '',
                totalget: '',
                type: 'buy'
            },
            cryptos: [],
            errors: {}
        };
    }

    componentDidMount(){
        this.getSelectecCrypto();
        this.timer = setInterval(()=> this.getSelectecCrypto(), 300000)
    };

    onChange = (totalGet) => (e) => 
        this.setState({
            data: {...this.state.data, totalget: totalGet*10, [e.target.name]: e.target.value}
        });

    onSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        console.log(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
        this.props
            .submit(this.state.data)
            .catch(err =>
                this.setState({ errors: err.response.data.errors})
            );
        }
        this.setState({data: {
            cryptocur: crSymbol,
            totalidr: '',
            totalget: '',
            type: 'buy'
        }});
        this.cancelCourse();
    }

    async getSelectecCrypto(){
        fetch("/api/cryptos/current-crypto")
        .then(response => response.json())
        .then(data => this.setState({cryptos: data.cryptos}))
    }

    cancelCourse = () => { 
        this.myFormRef.reset();
    }

    validate = data => {
        const errors = {};
        const {user} = this.props;
        if(!data.totalidr) errors.totalidr = alert("IDR input can't be blank!");
        if(data.totalidr > user.balance) errors.totalidr = alert("Input exceeding user balance!");
        if(isNaN(data.totalidr)) errors.totalidr = alert("Input must be number");
        return errors;
    }

    render(){
        const { user } = this.props;
        const { cryptos, errors, data } = this.state;
        let totalGet;
        for(let i = 0; i< cryptos.length; i++){
            if(cryptos[i].symbol === crSymbol){
                totalGet = cryptos.length > 0 ? (data.totalidr / (cryptos[i].price_usd * 13800)).toFixed(9) : 0;
            }
        }

        return (
            <form onSubmit={this.onSubmit} ref={(el) => this.myFormRef = el}>
            {errors.global && (
            <div className="alert alert-danger">{errors.global}</div>
            )}
            {cryptos.filter(x => x.symbol === crSymbol).map((item, index) => (
            <div>
            <FormGroup row>
            <Label for="Balance" sm={3}>Balance: </Label>
            <Label sm={9}><NumberFormat 
                        value={user.balance} 
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
                        type="totalidr" 
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
                    value={item.price_usd * 13800} 
                    displayType={'text'} 
                    thousandSeparator={true} 
                    prefix={'IDR '} 
                    decimalScale={0}
                    /></Label>
            </FormGroup>

            <FormGroup row>
                <Label for="cryptoGet" sm={3}>Total {crSymbol}: </Label>
                <Col sm={9}>
                <Input type="text" name="totalget" id="totalget" value={totalGet} placeholder="" onChange={this.onChange} />
                </Col>
                {/* <Label name="totalget" id="totalget" sm={9} value={data.totalidr / (item.price_usd * 13800)}>{data.totalidr / (item.price_usd * 13800)} {crSymbol}</Label> */}
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
    submit: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.user,
        //cryptos: state.cryptos
    };
}

export default connect(mapStateToProps)(BuyForm);