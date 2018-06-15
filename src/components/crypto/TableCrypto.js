import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table } from "reactstrap";
import NumberFormat from "react-number-format";
import FaArrowCircleODown from "react-icons/lib/fa/arrow-circle-o-down";
import FaArrowCircleOUp from "react-icons/lib/fa/arrow-circle-o-up";
import { allTransactionsSelector } from "../../reducers/transaction";
import "../../styles/font.css";

class TableCrypto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cryptos: [],
      sort: {
        column: null,
        direction: "desc"
      }
    };
  }

  componentDidMount() {
    this.getList();
    this.timer = setInterval(() => this.getList(), 300000);
  }

  onSort = column => e => {
    const direction = this.state.sort.column
      ? this.state.sort.direction === "asc"
        ? "desc"
        : "asc"
      : "desc";
    const sortedData = this.state.cryptos.sort((a, b) => {
      if (column === "rank") {
        return a.rank - b.rank;
      } else if (column === "symbol") {
        const nameA = a.symbol.toUpperCase(); // ignore upper and lowercase
        const nameB = b.symbol.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      } else if (column === "name") {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      } else if (column === "price_usd") {
        return a.price_usd - b.price_usd;
      } else if (column === "market_cap_usd") {
        return a.market_cap_usd - b.market_cap_usd;
      } else if (column === "percent_change_24h") {
        return a.percent_change_24h - b.percent_change_24h;
      }
    });

    if (direction === "desc") {
      sortedData.reverse();
    }

    this.setState({
      cryptos: sortedData,
      sort: {
        column,
        direction
      }
    });
  };

  async getList() {
    fetch("/api/cryptos/")
      .then(response => response.json())
      .then(data => this.setState({ cryptos: data.cryptos }));
  }

  setArrow = column => {
    let className = "sort-direction";

    if (this.state.sort.column === column) {
      className += this.state.sort.direction === "asc" ? " asc" : " desc";
    }

    return className;
  };

  render() {
    const array = [];
    var tempBuy = [];
    const { cryptos } = this.state;
    const { transactions, currKurs } = this.props;
    cryptos.map(item => {
      return array.push(transactions.filter(x => x.cryptocur === item.symbol));
    });
    //LOOPING TRANSACTION ON EACH ARRAY CRYPTO

    for (let i = 0; i < array.length; i++) {
      //CHECK IF CURRENT CRYPTO ARRAY LENGTH > 0
      if (array[i].length > 0) {
        let aa = [];
        let cc = [];
        let bb = 0;
        let dd = 0;
        let ee = 0;
        //LOOPING ARRAY OF TRANSACTION ON ARRAY CRYPTO [i]
        for (let j = 0; j < array[i].length; j++) {
          //console.log(array[i][j]);
          //CHECK IF THE TYPE OF TRANSACTION IS BUY
          if (array[i][j].type === "buy") {
            aa.push(array[i][j].totalget);
            //LOOPING NEW ARRAY OF TOTALGET OF TYPE BUY
            for (let zz = 0; zz < aa.length; zz++) {
              bb = aa.reduce((sum, num) => sum + num, 0);
            }
          } else if (array[i][j].type === "sell") {
            cc.push(array[i][j].totalget);
            //LOOPING NEW ARRAY OF TOTALGET OF TYPE BUY
            for (let vv = 0; vv < cc.length; vv++) {
              dd = cc.reduce((sum, num) => sum + num, 0);
            }
          } else {
            return;
          }
          ee = (bb - dd).toFixed(8);
        }
        tempBuy.push({ cryptoAsset: array[i][0].cryptocur, assetValue: ee });
      } else {
        // return "0";
      }
    }

    var tables = this.state.cryptos.map(
      function (item, index) {
        return (
          <tr
            key={item.id}
            id={item.id}
            value={item.symbol}
            onClick={() => this.props.submit(item.symbol)}
          >
            {/* <tr key={item.id} id={item.id} value={item.symbol} onClick={() => this.handleClickEvent(this, item.symbol)}> */}
            <td>{item.rank}</td>
            <td>{item.symbol}/IDR</td>
            <td>{item.name}</td>
            <td>
              <NumberFormat
                value={item.price_usd * currKurs.currKurs}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"IDR "}
                decimalScale={0}
              />
            </td>
            <td>
              <NumberFormat
                value={item.market_cap_usd}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$ "}
                decimalScale={0}
              />
            </td>
            <td>
              {item.percent_change_24h > 0 ? (
                <span style={{ color: "#15E100" }}>
                  <FaArrowCircleOUp /> {item.percent_change_24h}%
                </span>
              ) : (
                  <span style={{ color: "#e6393e" }}>
                    <FaArrowCircleODown /> {item.percent_change_24h}%
                </span>
                )}
            </td>
            <td>
              {tempBuy.filter(tb => tb.cryptoAsset === item.symbol).length > 0
                ? tempBuy
                  .filter(tb => tb.cryptoAsset === item.symbol)
                  .map(tbx => {
                    if (tbx) {
                      return tbx.assetValue;
                    }
                  })
                : "0"}{" "}
              <span style={{ fontWeight: 600 }}>{item.symbol}</span>
            </td>
          </tr>
        );
      }.bind(this)
    );

    return (
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th onClick={this.onSort("rank")}>
              Rank <span className={this.setArrow("rank")} />
            </th>
            <th onClick={this.onSort("symbol")}>
              Market <span className={this.setArrow("symbol")} />
            </th>
            <th onClick={this.onSort("name")}>
              Asset Name <span className={this.setArrow("name")} />
            </th>
            <th onClick={this.onSort("price_usd")}>
              Last Price <span className={this.setArrow("price_usd")} />
            </th>
            <th onClick={this.onSort("market_cap_usd")}>
              Volume (USD) <span className={this.setArrow("market_cap_usd")} />
            </th>
            <th onClick={this.onSort("percent_change_24h")}>
              % Change <span className={this.setArrow("percent_change_24h")} />
            </th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>{tables}</tbody>
      </Table>
    );
  }
}

TableCrypto.propTypes = {
  submit: PropTypes.func.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired
};

function mapStateToProps(state) {
  return {
    transactions: allTransactionsSelector(state),
    currKurs: state.currKurs
  };
}

export default connect(mapStateToProps, {})(TableCrypto);
