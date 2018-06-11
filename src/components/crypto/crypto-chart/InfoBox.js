import React, { Component } from 'react';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import '../../../styles/crypto-chart-css/InfoBox.css';

class InfoBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPrice: null,
            monthChangeD: null,
            monthChangeP: null,
            updatedAt: null,
        }
    }
    componentDidMount() {
        this.getData = () => {
            const { data } = this.props;
            const url = 'https://api.coindesk.com/v1/bpi/currentprice/IDR.json';

            fetch(url).then(r => r.json())
                .then((bitcoinData) => {
                    const price = bitcoinData.bpi.IDR.rate_float;
                    const change = price - data[0].y;
                    const changeP = (price - data[0].y) / data[0].y * 100;

                    this.setState({
                        currentPrice: bitcoinData.bpi.IDR.rate_float,
                        monthChangeD: change.toLocaleString('us-EN', { style: 'currency', currency: 'IDR' }),
                        monthChangeP: changeP.toFixed(2) + '%',
                        updatedAt: bitcoinData.time.updated
                    })
                })
                .catch((e) => {
                    console.log(e);
                });
        }
        this.getData();
        this.refresh = setInterval(() => this.getData(), 90000);
    }
    componentWillUnmount() {
        clearInterval(this.refresh);
    }
    render() {
        return (
            <div id="data-container">
                {this.state.currentPrice ?
                    <div id="left" className='box'>
                        <div className="heading">
                            <NumberFormat
                                value={this.state.currentPrice}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'IDR '}
                                decimalScale={0}
                            />
                        </div>
                        <div className="subtext">{'Updated ' + moment(this.state.updatedAt).fromNow()}</div>
                    </div>
                    : null}
                {this.state.currentPrice ?
                    <div id="middle" className='box'>
                        <div className={(this.state.monthChangeD).includes("-") ? "heading-color__red" : "heading"}>
                            <NumberFormat
                                value={this.state.monthChangeD}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'IDR '}
                                decimalScale={0}
                            />
                        </div>
                        <div className={(this.state.monthChangeD).includes("-") ? "subtext-color__red" : "subtext"}>Change Since Last Month (IDR)</div>
                    </div>
                    : null}
                {this.state.currentPrice ?
                    <div id="right" className='box'>
                        <div className={(this.state.monthChangeP).includes("-") ? "heading-color__red" : "heading"}>{this.state.monthChangeP}</div>
                        <div className={(this.state.monthChangeP).includes("-") ? "subtext-color__red" : "subtext"}>Change Since Last Month (%)</div>
                    </div>
                    : null}
            </div>
        );
    }
}

export default InfoBox;
