import React from 'react';
import {
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
//import gravatarUrl from 'gravatar-url';
import * as actions from '../../actions/auth';

import '../../styles/font.css';

class TopNavbar extends React.Component{
    state = {
        isOpen: false
    };

    toggle = () => this.setState({ isOpen: !this.state.isOpen });
    
    render(){
        const { logout } = this.props;

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
                        <img
                        className="img-fluid rounded-circle"
                        src="https://secure.gravatar.com/avatar/1c97abf43b29c030667ed3cba85a7473?size=40"
                        alt="Gravatar"
                        />
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
        email: PropTypes.string.isRequired
    }).isRequired,
    logout: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, { logout: actions.logout }, null, { pure: false })(TopNavbar);