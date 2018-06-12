import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import '../../../styles/crypto-chart-css/InfoBox.css';

class InfoBoxOthers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPrice: null,
            monthChangeD: null,
            monthChangeP: null,
            updatedAt: null
        }
    }

    componentDidMount() {
        this.getData = () => {
            const { data, kurs } = this.props;
            fetch('/api/cryptos/').then(r => r.json())
                .then((bitcoinData) => {
                    const y = bitcoinData.cryptos.filter(a => a.symbol === this.props.currCrypto.currCrypto);
                    const price = y[0].price_usd * kurs;
                    const change = price - data[0].y;
                    const changeP = (price - data[0].y) / data[0].y * 100;
                    var xyz = moment.unix(y[0].last_updated);
                    var xxx = moment(new Date());

                    this.setState({
                        currentPrice: price,
                        monthChangeD: change.toLocaleString('us-EN', { style: 'currency', currency: 'IDR' }),
                        monthChangeP: changeP.toFixed(2) + '%',
                        updatedAt: moment.duration(xxx.diff(xyz)).humanize()
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
        const { currentPrice, monthChangeD, monthChangeP, updatedAt } = this.state;

        return (
            <div id="data-container">
                {currentPrice ?
                    <div id="left" className='box'>
                        <div className="heading">
                            <NumberFormat
                                value={currentPrice}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'IDR '}
                                decimalScale={0}
                            />
                        </div>
                        <div className="subtext">{`Updated  + ${updatedAt} +  ago`}</div>
                    </div>
                    : null}
                {currentPrice ?
                    <div id="middle" className='box'>
                        <div className={(monthChangeD).includes("-") ? "heading-color__red" : "heading"}>
                            <NumberFormat
                                value={monthChangeD}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'IDR '}
                                decimalScale={0}
                            />
                        </div>
                        <div className={(monthChangeD).includes("-") ? "subtext-color__red" : "subtext"}>Change Since Last Month (IDR)</div>
                    </div>
                    : null}
                {currentPrice ?
                    <div id="right" className='box'>
                        <div className={(monthChangeP).includes("-") ? "heading-color__red" : "heading"}>{monthChangeP}</div>
                        <div className={(monthChangeP).includes("-") ? "subtext-color__red" : "subtext"}>Change Since Last Month (%)</div>
                    </div>
                    : null}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currCrypto: state.currCrypto
    }
}

export default connect(mapStateToProps, {})(InfoBoxOthers);
