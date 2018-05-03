import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Table } from 'reactstrap';

class TableCypto extends React.Component {
    constructor(){
        super()
        this.state = {
            cryptos: []
        }
    }

    componentDidMount(){
        axios.get("/api/cryptos/")
        .then((response) => {
            console.log(response);
        })
    }

    render() {
        return (
        <Table hover size="sm">
            <thead>
            <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
            </tr>
            </thead>
            <tbody>
            {Object.keys(this.state.cryptos).map((key) => (
                <tr>
                    <th scope="row">{key}</th>
                    <td>(this.state.crypto.name)</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
            ))}
            </tbody>
        </Table>
        );
    }
}

export default connect()(TableCypto);