import React from 'react';
import {
    Button,
    Navbar,
    Nav,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem, Table
} from 'reactstrap';
import PropTypes from 'prop-types';
import { NavLink as RouterNavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
//import gravatarUrl from 'gravatar-url';
import * as actions from '../../actions/auth';
import { fetchCurrCrypto } from '../../actions/cryptos';
import { allTransactionsSelector } from '../../reducers/transaction';

import '../../styles/font.css';

class TopNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cryptosBTC: [],
            cryptos: [],
            isOpen: false,
            balance: 0,
            kurs: 0,
        };
    }

    componentDidMount() {
        this.getList();
        this.getBTC();
        this.timer = setInterval(() => this.getBTC(), 300000);
        setInterval(() => this.getCurrentBalance(), 0);
        this.getKurs();
    };

    componentWillReceiveProps(props) {
        const taTempBuy = this.props.transactions.filter(item => item.type === 'buy')
            .map(item => item.totalidr);
        const tAmountBuy = taTempBuy.reduce(((sum, number) => sum + number), 0);
        const taTempSell = this.props.transactions.filter(item => item.type === 'sell')
            .map(item => item.totalidr);
        const tAmountSell = taTempSell.reduce(((sum, number) => sum + number), 0);
        this.setState({
            balance: this.props.user.balance - (tAmountBuy - tAmountSell)
        })
    }

    async getBTC() {
        fetch("/api/cryptos/bitcoin-price")
            .then(response => response.json())
            .then(data => this.setState({ cryptosBTC: data.cryptos }))
    }

    async getList() {
        fetch("/api/cryptos/")
            .then(response => response.json())
            .then(data => this.setState({ cryptos: data.cryptos }))
    }

    async getKurs() {
        fetch('http://free.currencyconverterapi.com/api/v5/convert?q=USD_IDR&compact=y')
            .then(response => response.json())
            .then(data => this.setState({ kurs: data.USD_IDR.val }));
    }

    getCurrentBalance() {
        const taTempBuy = this.props.transactions.filter(item => item.type === 'buy')
            .map(item => item.totalidr);
        const tAmountBuy = taTempBuy.reduce(((sum, number) => sum + number), 0);
        const taTempSell = this.props.transactions.filter(item => item.type === 'sell')
            .map(item => item.totalidr);
        const tAmountSell = taTempSell.reduce(((sum, number) => sum + number), 0);
        this.setState({
            balance: this.props.user.balance - (tAmountBuy - tAmountSell)
        })
    }

    handleClick = (param, e) => {
        this.props.fetchCurrCrypto(param);
    }

    toggle = () => this.setState({ isOpen: !this.state.isOpen });

    render() {
        const { user, logout, transactions } = this.props;
        const { cryptosBTC, cryptos, balance, kurs } = this.state;
        const array = [];
        var tempBuy = [];
        let totalAsset = 0;
        cryptos.map(item => {
            return array.push(transactions.filter(x => x.cryptocur === item.symbol))
        });
        //LOOPING TRANSACTION ON EACH ARRAY CRYPTO

        for (let i = 0; i < array.length; i++) {
            //CHECK IF CURRENT CRYPTO ARRAY LENGTH > 0
            if (array[i].length > 0) {
                let aa = []; let cc = [];
                let bb = 0; let dd = 0; let ee = 0;
                //LOOPING ARRAY OF TRANSACTION ON ARRAY CRYPTO [i]
                for (let j = 0; j < array[i].length; j++) {
                    //console.log(array[i][j]);
                    //CHECK IF THE TYPE OF TRANSACTION IS BUY
                    if ((array[i][j].type === 'buy')) {

                        aa.push(array[i][j].totalget);
                        //LOOPING NEW ARRAY OF TOTALGET OF TYPE BUY
                        for (let zz = 0; zz < aa.length; zz++) {
                            bb = aa.reduce(((sum, num) => sum + num), 0);
                        }
                    } else if ((array[i][j].type === 'sell')) {
                        cc.push(array[i][j].totalget);
                        //LOOPING NEW ARRAY OF TOTALGET OF TYPE BUY
                        for (let vv = 0; vv < cc.length; vv++) {
                            dd = cc.reduce(((sum, num) => sum + num), 0);
                        }
                    } else {
                        return;
                    }
                    ee = (bb - dd).toFixed(8);

                }
                tempBuy.push({ cryptoAsset: array[i][0].cryptocur, assetValue: ee });
            } else {
                // return "0";
            }
        }

        for (let xx = 0; xx < tempBuy.length; xx++) {
            let yy = 0;
            yy = cryptos.filter(vv => vv.symbol === tempBuy[xx].cryptoAsset).map(nn => nn.price_usd);
            totalAsset += tempBuy[xx].assetValue * yy * kurs;
        }

        return (
            <Navbar expand="sm" style={{
                backgroundColor: "#42b549",
            }}>
                <NavbarBrand className=".nav-title" tag={RouterNavLink} activeClassName="active" to="/" style={{
                    fontSize: "2em", color: "white"
                }}>
                    tokocrypto
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink
                                tag={RouterNavLink}
                                activeClassName="active"
                                to="/dashboard"
                            >
                            </NavLink>
                        </NavItem>
                        <NavItem>
                        </NavItem>
                    </Nav>
                    <Nav className="ml-auto" navbar>
                        <UncontrolledDropdown nav>
                            <DropdownToggle nav>
                                <Button outline color="success" style={{ backgroundColor: "#28a745", color: "white" }}>
                                    1 BTC = {cryptosBTC.map(item => (
                                        <span key={item.id}><NumberFormat
                                            value={item.price_usd * kurs}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            prefix={'IDR '}
                                            decimalScale={0}
                                        /></span>
                                    ))}
                                </Button>
                            </DropdownToggle>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav>
                            <DropdownToggle nav>
                                <Button outline color="success" style={{ backgroundColor: "#28a745", color: "white" }}>
                                    Saldo = <NumberFormat
                                        value={balance}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'IDR '}
                                        decimalScale={0}
                                    />
                                </Button>
                            </DropdownToggle>
                            <DropdownMenu right style={{ width: 400, paddingLeft: 15, paddingRight: 15 }}>
                                <Table size="sm">
                                    <thead style={{ backgroundColor: "#28a745", color: "white" }}>
                                        <tr>
                                            <td colSpan={2}>Estimated Asset Value:</td>
                                            <td className="text-center"><NumberFormat
                                                value={totalAsset}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                prefix={'IDR '}
                                                decimalScale={0}
                                            /></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tempBuy.map((x, index) =>
                                            (<tr key={index}>
                                                <td colSpan={2}>{x.assetValue} <span style={{ fontWeight: 500 }}>{x.cryptoAsset}</span></td>
                                                <td className="text-center">
                                                    <Link
                                                        className="btn btn-primary btn-sm"
                                                        style={{
                                                            backgroundColor: "#ff5722",
                                                            border: "none"
                                                        }}
                                                        to={'/market/' + x.cryptoAsset}
                                                        onClick={(e) => this.handleClick(x.cryptoAsset, e)}>Market</Link>
                                                </td>
                                            </tr>))}
                                    </tbody>
                                </Table>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav>
                            <DropdownToggle nav>
                                <img
                                    className="img-fluid rounded-circle"
                                    src="https://secure.gravatar.com/avatar/1c97abf43b29c030667ed3cba85a7473?size=40"
                                    alt="Gravatar"
                                />
                                <span style={{ marginLeft: 5, color: "white" }}>{user.username}</span>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem><Link
                                    to="/account/history"
                                    style={{ color: "#000", textDecoration: "none" }}
                                >
                                    My Account
                            </Link></DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => logout()}>Logout</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }
};

TopNavbar.propTypes = {
    user: PropTypes.shape({
        email: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
    }).isRequired,
    logout: PropTypes.func.isRequired,
    transactions: PropTypes.arrayOf(PropTypes.shape({
    }).isRequired).isRequired,
    fetchCurrCrypto: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        user: state.user,
        transactions: allTransactionsSelector(state)
    };
}

export default connect(
    mapStateToProps,
    { logout: actions.logout, fetchCurrCrypto },
    null,
    { pure: false })(TopNavbar);