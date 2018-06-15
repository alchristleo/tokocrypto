import React from "react";
import FaGithub from "react-icons/lib/fa/github";
import FaSteam from "react-icons/lib/fa/steam";
import FaChrome from "react-icons/lib/fa/chrome";
import { connect } from 'react-redux';

class Footer extends React.Component {
  render() {
    return (
      <footer
        className="navbar navbar-expand-sm background-green color-white text-center"
        style={
          window.location.pathname === "/" || this.props.user.confirmed === false ? { marginTop: 0 } : { marginTop: 50 }
        }
      >
        <div className="container">
          <div className="col col-xs-12 col-sm-12 col-lg-12">
            <h6 style={{ marginLeft: -20 }}>
              This project is made for tokopedia assignment test, created by:
              Alchrist Leo
          <a
                style={{ color: "#fff", marginLeft: 10 }}
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/alchristleo"
              >
                <FaGithub />
              </a>
              <a
                style={{ color: "#fff", marginLeft: 5 }}
                target="_blank"
                rel="noopener noreferrer"
                href="https://steamcommunity.com/id/alchrist"
              >
                <FaSteam />
              </a>
              <a
                style={{ color: "#fff", marginLeft: 5 }}
                target="_blank"
                rel="noopener noreferrer"
                href="http://alchristleo.net"
              >
                <FaChrome />
              </a>
            </h6>
          </div>
        </div>
      </footer>
    );
  }
};

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, {})(Footer);
