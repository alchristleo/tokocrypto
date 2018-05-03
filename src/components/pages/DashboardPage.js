import React from 'react';
import PropTypes from 'prop-types';
import {Container} from 'reactstrap';
import {connect} from 'react-redux';
import TopNavbar from '../navigation/TopNavbar';

class DashboardPage extends React.Component{
    render(){
        const { isAuthenticated } = this.props;

        return (
            <Container>
                {isAuthenticated && <TopNavbar />}
            </Container>
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