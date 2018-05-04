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
import { NavLink as RouterNavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
//import gravatarUrl from 'gravatar-url';
import * as actions from '../../actions/auth';

import '../../styles/font.css';

class TopNavbar extends React.Component{
    state = {
        cryptos: [],
        isOpen: false
    };

    componentDidMount(){
        this.timer = setInterval(()=> this.getList(), 1000)
    };

    async getList(){
        fetch("/api/cryptos/bitcoin-price")
        .then(response => response.json())
        .then(data => this.setState({cryptos: data.cryptos}))
    }

    toggle = () => this.setState({ isOpen: !this.state.isOpen });
    
    render(){
        const { user, logout } = this.props;
        const { cryptos } = this.state;

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
                    <Button outline color="success" style={{backgroundColor: "#28a745", color:"white"}}>
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
                    <Button outline color="success" style={{marginLeft: 5, backgroundColor: "#28a745", color:"white"}}>
                        Saldo = <NumberFormat 
                        value={user.balance} 
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
                        <span style={{marginLeft:5, color:"white"}}>{user.username}</span>
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>My Account</DropdownItem>
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
};

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, { logout: actions.logout }, null, { pure: false })(TopNavbar);