import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Table } from 'reactstrap';
import NumberFormat from 'react-number-format';
import FaArrowCircleODown from 'react-icons/lib/fa/arrow-circle-o-down';
import FaArrowCircleOUp from 'react-icons/lib/fa/arrow-circle-o-up';

import '../../styles/font.css';

class TableCypto extends React.Component {
    // state = {
    //     data: {
    //         id: this.props.crypto.id,
    //         name: this.props.crypto.name,
    //         price_usd: this.props.crypto.price_usd,
    //         percent_change_24h: this.props.crypto.percent_change_24h
    //     }
    // };
    constructor(props){
        super(props)
        this.state = {
            cryptos: []
        }
    }


    // componentWillReceiveProps(props) {
    //     this.setState({
    //         data: {
    //             id: props.crypto.id,
    //             name: props.crypto.name,
    //             price_usd: props.crypto.price_usd,
    //             percent_change_24h: props.crypto.percent_change_24h
    //         }
    //     });
    // }

    componentDidMount(){
        this.timer = setInterval(()=> this.getList(), 1000)
        // .then(cryptos => {
        //     const options = [];
        //     cryptos.forEach(crypto => {
        //         options.push({
        //             id: crypto.id,
        //             name: crypto.name,
        //             price_usd: crypto.price_usd,
        //             percent_change_24h: crypto.percent_change_24h
        //         })
        //     })
        // })
    };

    async getList(){
        fetch("/api/cryptos/")
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
            </tr>
            </thead>
            <tbody>
            {cryptos.map(item => (
                <tr key={item.id} id={item.id}>
                    <th scope="row">{item.symbol}/IDR</th>
                    <td>{item.name}</td>
                    <td><NumberFormat 
                        value={item.price_usd * 13000} 
                        displayType={'text'} 
                        thousandSeparator={true} 
                        prefix={'IDR '} 
                        decimalScale={0}
                        /></td>
                    <td>{item.percent_change_24h > 0 ? 
                        <span style={{color: "#15E100"}}><FaArrowCircleOUp /> {item.percent_change_24h}%</span> : 
                        <span style={{color: "#e6393e"}}><FaArrowCircleODown /> {item.percent_change_24h}%</span>}
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
        );
    }
}

export default connect()(TableCypto);