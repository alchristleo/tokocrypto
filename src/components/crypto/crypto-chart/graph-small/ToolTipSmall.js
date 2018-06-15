import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import '../../../../styles/crypto-chart-css/ToolTip.css';

class ToolTipSmall extends Component {
    state = {

    };

    render() {
        const { hoverLoc, activePoint } = this.props;
        const svgLocation = document.getElementsByClassName("linechart-small")[0].getBoundingClientRect();

        let placementStyles = {};
        let width = 100;
        placementStyles.width = width + 'px';
        placementStyles.left = hoverLoc + svgLocation.left - (width / 2);

        return (
            <div className='hover-small' style={placementStyles}>
                {activePoint ? <div className='date'>{activePoint.d}</div> : null}
                {activePoint ? <div className='price-small'><NumberFormat
                    value={activePoint.p}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'IDR '}
                    decimalScale={0}
                /></div> : null}
            </div>
        )
    }
}

export default ToolTipSmall;
