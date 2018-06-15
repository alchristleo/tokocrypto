import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import '../../../../styles/crypto-chart-css/App_chart.css';
import LineChart from '../LineChart';
import ToolTip from '../ToolTip';
import InfoBoxOthers from './InfoBoxOthers';

class AppChartOthers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cryptos: [],
            fetchingData: true,
            data: null,
            hoverLoc: null,
            activePoint: null,
        }
    }

    componentDidMount() {
        this.getSelectecCrypto();
        const getData = () => {
            const url = `https://min-api.cryptocompare.com/data/histoday?fsym=${this.props.currCrypto.currCrypto}&tsym=IDR&limit=30&aggregate=1&e=CCCAGG`;
            fetch(url).then(r => r.json())
                .then((Response) => {
                    const sortedData = [];
                    const listData = Response.Data;
                    for (let i = 0; i < listData.length; i++) {
                        sortedData.push({
                            d: moment.unix(listData[i].time).format('MMM DD'),
                            p: (listData[i].close),
                            x: i,
                            y: (listData[i].close)
                        });
                    };
                    console.log(sortedData);
                    this.setState({
                        data: sortedData,
                        fetchingData: false
                    });
                })
                .catch((e) => {
                    console.log(e);
                });
        }
        getData();
    }

    async getSelectecCrypto() {
        fetch("/api/cryptos/current-crypto")
            .then(response => response.json())
            .then(data => this.setState({ cryptos: data.cryptos }))
    }

    handleChartHover(hoverLoc, activePoint) {
        this.setState({
            hoverLoc: hoverLoc,
            activePoint: activePoint
        })
    }

    render() {
        const assetName = this.state.cryptos.filter(x => x.symbol === this.props.currCrypto.currCrypto).map(function (y) {
            return y.name;
        });

        return (
            <div className='container'>
                <div className='row'>
                    <h1 className='title-heading'>30 Days {assetName} Price Chart</h1>
                </div>
                <div className='row'>
                    {!this.state.fetchingData ?
                        <InfoBoxOthers data={this.state.data} />
                        : null}
                </div>
                <div className='row'>
                    <div className='popup'>
                        {this.state.hoverLoc ? <ToolTip hoverLoc={this.state.hoverLoc} activePoint={this.state.activePoint} /> : null}
                    </div>
                </div>
                <div className='row'>
                    <div className='chart'>
                        {!this.state.fetchingData ?
                            <LineChart data={this.state.data} onChartHover={(a, b) => this.handleChartHover(a, b)} />
                            : null}
                    </div>
                </div>
                <div className='row'>
                    <div id="coindesk"> Powered by <a href="http://www.coindesk.com/price/">CoinDesk</a></div>
                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        currCrypto: state.currCrypto,
        cyptos: state.cryptos
    };
}

export default connect(mapStateToProps, {})(AppChartOthers);
