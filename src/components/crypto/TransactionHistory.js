import React from 'react';
import {
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import classnames from 'classnames';
import AllTransactions from '../transactions/AllTransactions';
import BuyTransactions from '../transactions/BuyTransactions';
import SellTransactions from '../transactions/SellTransactions';

import '../../styles/font.css';

class TransactionHistory extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        return (
            <Container>
                <Nav tabs className="background-green">
                    <NavItem className="navItem__hover">
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                        >
                            All Transaction
                        </NavLink>
                    </NavItem>
                    <NavItem className="navItem__hover">
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                        >
                            Buy Transaction
                        </NavLink>
                    </NavItem>
                    <NavItem className="navItem__hover">
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '3' })}
                            onClick={() => { this.toggle('3'); }}
                        >
                            Sell Transaction
                        </NavLink>
                    </NavItem>
                </Nav>
                <Container className="margin20">
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <AllTransactions />
                        </TabPane>
                        <TabPane tabId="2">
                            <BuyTransactions />
                        </TabPane>
                        <TabPane tabId="3">
                            <SellTransactions />
                        </TabPane>
                    </TabContent>
                </Container>
            </Container>
        );
    }
}

export default TransactionHistory;