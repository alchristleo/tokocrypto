import React from 'react';
import PropTypes from 'prop-types';
import {Container} from 'reactstrap';
import {connect} from 'react-redux';
import TopNavbar from '../navigation/TopNavbar';
import TableCrypto from '../crypto/TableCrypto';

class DashboardPage extends React.Component{
    render(){
        const { isAuthenticated } = this.props;

        return (
            <div>
                {isAuthenticated && <TopNavbar />}

                <Container>
                    <h3 style={{marginTop:20}}>IDR Market</h3>
                    <TableCrypto
                        history={{push: (path) => {}}}
                    />
                </Container>
            </div>
        );
    }
};

DashboardPage.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
};

function mapStateToProps(state){
    return {
        isAuthenticated: !!state.user.email
    }
}

export default connect(mapStateToProps)(DashboardPage);