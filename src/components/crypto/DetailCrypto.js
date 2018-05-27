import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import NumberFormat from 'react-number-format';
import FaArrowCircleODown from 'react-icons/lib/fa/arrow-circle-o-down';
import FaArrowCircleOUp from 'react-icons/lib/fa/arrow-circle-o-up';
import { allTransactionsSelector } from '../../reducers/transaction';

import '../../styles/font.css';

class DetailCrypto extends React.Component {
    state = {
        cryptos: [],
        data: {
            totalget: this.props.totalget,
            cyptocur: this.props.cyptocur,
            totalidr: this.props.totalidr,
            type: this.props.type
        },
        currCryptoBalance: 0
    }

    componentDidMount() {
        this.getSelectecCrypto();
        this.timer = setInterval(() => this.getSelectecCrypto(), 300000);
        setInterval(() => this.getCurrentCryptoBalance(), 0);
    };

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

    render() {
        const { cryptos, currCryptoBalance } = this.state;
        const { currCrypto } = this.props;
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
                    {cryptos.filter(x => x.symbol === currCrypto.currCrypto).map(item => (
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
                                <span style={{ color: "#15E100" }}><FaArrowCircleOUp /> {item.percent_change_24h}%</span> :
                                <span style={{ color: "#e6393e" }}><FaArrowCircleODown /> {item.percent_change_24h}%</span>}
                            </td>

                            <td>{currCryptoBalance ? (currCryptoBalance).toFixed(8) : 0} {item.symbol}</td>
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
        currCrypto: state.currCrypto,
        transactions: allTransactionsSelector(state)
    };
}

export default connect(mapStateToProps)(DetailCrypto);