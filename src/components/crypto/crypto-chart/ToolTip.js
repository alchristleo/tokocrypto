import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import '../../../styles/crypto-chart-css/ToolTip.css';

class ToolTip extends Component {
    state = {

    };

    render() {
        const { hoverLoc, activePoint } = this.props;
        const svgLocation = document.getElementsByClassName("linechart")[0].getBoundingClientRect();

        let placementStyles = {};
        let width = 100;
        placementStyles.width = width + 'px';
        placementStyles.left = hoverLoc + svgLocation.left - (width / 2);

        return (
            <div className='hover' style={placementStyles}>
                <div className='date'>{activePoint.d}</div>
                <div className='price'><NumberFormat
                    value={activePoint.p}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'IDR '}
                    decimalScale={0}
                /></div>
            </div>
        )
    }
}

export default ToolTip;
