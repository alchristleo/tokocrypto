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
    DropdownItem
} from 'reactstrap';
import PropTypes from 'prop-types';
import { NavLink as RouterNavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
//import gravatarUrl from 'gravatar-url';
import * as actions from '../../actions/auth';
import { allTransactionsSelector } from '../../reducers/transaction';

import '../../styles/font.css';

class TopNavbar extends React.Component {
    state = {
        cryptos: [],
        isOpen: false,
        balance: 0
    };

    componentDidMount() {
        this.getList();
        this.timer = setInterval(() => this.getList(), 300000);
        setInterval(() => this.getCurrentBalance(), 0);
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

    async getList() {
        fetch("/api/cryptos/bitcoin-price")
            .then(response => response.json())
            .then(data => this.setState({ cryptos: data.cryptos }))
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

    toggle = () => this.setState({ isOpen: !this.state.isOpen });

    render() {
        const { user, logout } = this.props;
        const { cryptos, balance } = this.state;

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
                        <Button outline color="success" style={{ backgroundColor: "#28a745", color: "white" }}>
                            1 BTC = {cryptos.map(item => (
                                <span key={item.id}><NumberFormat
                                    value={item.price_usd * 13800}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'IDR '}
                                    decimalScale={0}
                                /></span>
                            ))}
                        </Button>
                        <Button outline color="success" style={{ marginLeft: 5, backgroundColor: "#28a745", color: "white" }}>
                            Saldo = <NumberFormat
                                value={balance}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'IDR '}
                                decimalScale={0}
                            />
                        </Button>
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
    }).isRequired).isRequired
};

function mapStateToProps(state) {
    return {
        user: state.user,
        transactions: allTransactionsSelector(state)
    };
}

export default connect(mapStateToProps, { logout: actions.logout }, null, { pure: false })(TopNavbar);