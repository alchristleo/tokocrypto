import React from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import { allTransactionsSelector } from '../../reducers/transaction';

class SellTransactions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: this.props.transactions
        }
    }

    render() {
        const { transactions } = this.state;

        var list = transactions.filter(x => x.type === 'sell').map(function (items, index) {
            return (
                <tr key={index}>
                    <td>{moment(items.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                    <td>Sell</td>
                    <td>{items.cryptocur}</td>
                    <td>{<NumberFormat
                        value={items.totalget}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={' ' + items.cryptocur}
                        decimalScale={8}
                    />}</td>
                    <td>{<NumberFormat
                        value={items.totalidr}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={' IDR'}
                        decimalScale={0}
                    />}</td>
                </tr>
            );
        });

        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Type</th>
                        <th>Asset Name</th>
                        <th>Order</th>
                        <th>Filled</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.length > 0 ? list :
                        <tr className="text-center"><td colSpan={5}>You haven't made any transaction yet</td></tr>}
                </tbody>
            </Table>
        );
    }
}

SellTransactions.propTypes = {
    transactions: PropTypes.arrayOf(PropTypes.shape({
    }).isRequired).isRequired
}

function mapStateToProps(state) {
    return {
        transactions: allTransactionsSelector(state)
    }
}

export default connect(mapStateToProps)(SellTransactions);