import React from 'react';
//import axios from 'axios';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Table } from 'reactstrap';
import NumberFormat from 'react-number-format';
import FaArrowCircleODown from 'react-icons/lib/fa/arrow-circle-o-down';
import FaArrowCircleOUp from 'react-icons/lib/fa/arrow-circle-o-up';

import '../../styles/font.css';

class TableCrypto extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            cryptos: []
        }
    }

    componentDidMount(){
        this.timer = setInterval(()=> this.getList(), 1000)
    };

    async getList(){
        fetch("/api/cryptos/")
        .then(response => response.json())
        .then(data => this.setState({cryptos: data.cryptos}))
    }

    navigate = () => {
        const path = '/dashboard';
        this.props.history.push(path);
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
            {cryptos.map(item => (
                <tr key={item.id} id={item.id} value={item.symbol} onClick={this.navigate}>
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

TableCrypto.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
};

export default connect(null, {})(TableCrypto);