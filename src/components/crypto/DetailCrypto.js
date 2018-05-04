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
            cryptos: []
        }
    }

    componentDidMount(){
        this.timer = setInterval(()=> this.getSelectecCrypto(), 1000)
    };

    async getSelectecCrypto(){
        fetch("/api/cryptos/current-crypto")
        .then(response => response.json())
        .then(data => this.setState({cryptos: data.cryptos}))
    }

    render() {
        const { cryptos } = this.state;
        

        return (
        <Table bordered hover size="sm">
            <thead>
            <tr>
                <th>Market</th>
                <th>Asset Name</th>
                <th>Last Price</th>
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
                    <td>{item.percent_change_24h > 0 ? 
                        <span style={{color: "#15E100"}}><FaArrowCircleOUp /> {item.percent_change_24h}%</span> : 
                        <span style={{color: "#e6393e"}}><FaArrowCircleODown /> {item.percent_change_24h}%</span>}
                    </td>
                    <td>0 {item.symbol}</td>
                </tr>
            ))}
            </tbody>
        </Table>
        );
    }
}

export default connect(null, {})(DetailCrypto);