import React from 'react';
//import axios from 'axios';
//import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Table } from 'reactstrap';
import NumberFormat from 'react-number-format';
import FaArrowCircleODown from 'react-icons/lib/fa/arrow-circle-o-down';
import FaArrowCircleOUp from 'react-icons/lib/fa/arrow-circle-o-up';

import '../../styles/font.css';

const array = window.location.href.split('market/');
const crSymbol = array[1];


class DetailCrypto extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            cryptos: [],
            transactions: {
                totalget: '',
                cyptocur: '',
                totalidr: ''
            }
        }
    }

    componentDidMount(){
        this.getSelectecCrypto();
        this.timer = setInterval(()=> this.getSelectecCrypto(), 300000)
    };

    componentWillReceiveProps() {
        const {transactions} = this.props;
        this.setState({transactions: {
            totalget: '0.54321898',
            cryptocur: crSymbol,
            totalidr: '5000000'
        }});
    }

    async getSelectecCrypto(){
        fetch("/api/cryptos/current-crypto")
        .then(response => response.json())
        //.then(data => console.log(data))
        .then(data => this.setState({cryptos: data.cryptos}))
    }

    render() {
        const { cryptos, transactions } = this.state;
        //console.log(this.props.transactions);
        //let totalGet;
        // for(let i = 0; i< transactions.length; i++){
        //     if(transactions[i].cryptocur === crSymbol){
        //         totalGet = transactions.length > 0 ? transactions[i].totalget : 0;
        //     }
        // }

        return (
        <Table bordered hover size="sm">
            <thead>
            <tr>
                <th>Market</th>
                <th>Asset Name</th>
                <th>Last Price</th>
                <th>Volume (USD)</th>
                <th>% Change</th>
                <th>Balance</th>
            </tr>
            </thead>
            <tbody>
            {cryptos.filter(x => x.symbol === crSymbol).map(item => (
                <tr key={item.id} id={item.id} value={item.symbol}>
                    <th scope="row">{item.symbol}/IDR</th>
                    <td>{item.name}</td>
                    <td><NumberFormat 
                        value={item.price_usd * 13800} 
                        displayType={'text'} 
                        thousandSeparator={true} 
                        prefix={'IDR '} 
                        decimalScale={0}
                        /></td>
                    <td><NumberFormat 
                        value={item.market_cap_usd} 
                        displayType={'text'} 
                        thousandSeparator={true} 
                        prefix={'$ '} 
                        decimalScale={0}
                        /></td>
                    <td>{item.percent_change_24h > 0 ? 
                        <span style={{color: "#15E100"}}><FaArrowCircleOUp /> {item.percent_change_24h}%</span> : 
                        <span style={{color: "#e6393e"}}><FaArrowCircleODown /> {item.percent_change_24h}%</span>}
                    </td>
                    
                    <td>{transactions.totalget ? transactions.totalget : 0} {item.symbol}</td>
                </tr>
            ))}
            </tbody>
        </Table>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        transactions: state.transactions
    };
}

export default connect(mapStateToProps, {})(DetailCrypto);