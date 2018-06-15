import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import '../../../../styles/crypto-chart-css/App_chart.css';
import LineChartSmall from './LineChartSmall';
import ToolTipSmall from './ToolTipSmall';

class AppChartBTCSmall extends Component {
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
            const url = `https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=IDR&limit=30&aggregate=1&e=CCCAGG`;
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

        return (
            <div className='container'>
                <div className='row-small'>
                    <div className='popup-small'>
                        {this.state.hoverLoc ? <ToolTipSmall hoverLoc={this.state.hoverLoc} activePoint={this.state.activePoint} /> : null}
                    </div>
                </div>
                <div className='row-small'>
                    <div className='chart'>
                        {!this.state.fetchingData ?
                            <LineChartSmall data={this.state.data} onChartHover={(a, b) => this.handleChartHover(a, b)} />
                            : null}
                    </div>
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

export default connect(mapStateToProps, {})(AppChartBTCSmall);
