import React from 'react';
//import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import NumberFormat from 'react-number-format';
import FaArrowCircleODown from 'react-icons/lib/fa/arrow-circle-o-down';
import FaArrowCircleOUp from 'react-icons/lib/fa/arrow-circle-o-up';

import '../../styles/font.css';

class TableCrypto extends React.Component {
    constructor(props) {
        super(props);
        //this.onClick = this.onClick.bind(this);
        this.state = {
            cryptos: [],
            sort: {
                column: null,
                direction: 'desc',
            },
            crClick: '',
        }
    }

    componentDidMount() {
        this.getList();
        this.timer = setInterval(() => this.getList(), 300000)
    };

    onSort = (column) => (e) => {
        const direction = this.state.sort.column ? (this.state.sort.direction === 'asc' ? 'desc' : 'asc') : 'desc';
        const sortedData = this.state.cryptos.sort((a, b) => {
            if (column === 'rank') {
                return a.rank - b.rank;
            } else if (column === 'symbol') {
                const nameA = a.symbol.toUpperCase(); // ignore upper and lowercase
                const nameB = b.symbol.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                // names must be equal
                return 0;
            } else if (column === 'name') {
                const nameA = a.name.toUpperCase(); // ignore upper and lowercase
                const nameB = b.name.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                // names must be equal
                return 0;
            } else if (column === 'price_usd') {
                return a.price_usd - b.price_usd;
            } else if (column === 'market_cap_usd') {
                return a.market_cap_usd - b.market_cap_usd;
            } else if (column === 'percent_change_24h') {
                return a.percent_change_24h - b.percent_change_24h;
            }
        });

        if (direction === 'desc') {
            sortedData.reverse();
        }

        this.setState({
            cryptos: sortedData,
            sort: {
                column,
                direction,
            }
        });
    };

    async getList() {
        fetch("/api/cryptos/")
            .then(response => response.json())
            .then(data => this.setState({ cryptos: data.cryptos }))
    }

    setArrow = (column) => {
        let className = 'sort-direction';

        if (this.state.sort.column === column) {
            className += this.state.sort.direction === 'asc' ? ' asc' : ' desc';
        }

        return className;
    };

    // handleClickEvent = (value) => (e) => {
    //     e.preventDefault();
    //     this.setState({ crClick: value });
    //     console.log(this.state.crClick);
    //     //this.props.submit(this.state.crClick);
    // }

    render() {
        var tables = this.state.cryptos.map(function (item, index) {
            return (
                <tr key={item.id} id={item.id} value={item.symbol} onClick={() => this.props.submit(item.symbol)}>
                    {/* <tr key={item.id} id={item.id} value={item.symbol} onClick={() => this.handleClickEvent(this, item.symbol)}> */}
                    <td>{item.rank}</td>
                    <td>{item.symbol}/IDR</td>
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
                        <span style={{ color: "#15E100" }}><FaArrowCircleOUp /> {item.percent_change_24h}%</span> :
                        <span style={{ color: "#e6393e" }}><FaArrowCircleODown /> {item.percent_change_24h}%</span>}
                    </td>
                    <td>0 {item.symbol}</td>
                </tr>
            );
        }.bind(this)
        );

        return (
            <Table striped bordered hover size="sm" >
                <thead>
                    <tr>
                        <th onClick={this.onSort('rank')}>Rank <span className={this.setArrow('rank')}></span></th>
                        <th onClick={this.onSort('symbol')}>Market <span className={this.setArrow('symbol')}></span></th>
                        <th onClick={this.onSort('name')}>Asset Name <span className={this.setArrow('name')}></span></th>
                        <th onClick={this.onSort('price_usd')}>Last Price <span className={this.setArrow('price_usd')}></span></th>
                        <th onClick={this.onSort('market_cap_usd')}>Volume (USD) <span className={this.setArrow('market_cap_usd')}></span></th>
                        <th onClick={this.onSort('percent_change_24h')}>% Change <span className={this.setArrow('percent_change_24h')}></span></th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {tables}
                </tbody>
            </Table>
        );
    }
}

TableCrypto.propTypes = {
    // history: PropTypes.shape({
    //     push: PropTypes.func.isRequired
    // }).isRequired
    submit: PropTypes.func.isRequired
};

export default connect(null, {})(TableCrypto);