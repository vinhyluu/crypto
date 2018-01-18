import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SearchForm from "./searchForm";
const NumberFormat = require("react-number-format");

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      cryptos: [],
    }
  }

  componentDidMount(){
    axios.get("https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=CAD")
      .then(res => {
        const cryptos = res.data;
        console.log(cryptos);
        this.setState({
          cryptos: cryptos
        })
      })
    }

    render() {
      return (
        <div>
          <header>
            <h1>CryptoAnalyze</h1>
          </header>

          <div className="search">
            <SearchForm />
          </div>

          {/* each key here would be BTC, ETH, IOT. To get deeper into the data we want the value AT the key */}
          {Object.keys(this.state.cryptos).map((key) => (
            <div className="cryptoContainer">
              <span className="title">{key}</span>
              <span className="value"><NumberFormat value={this.state.cryptos[key].CAD} displayType={"text"} decimalprecision={2} thousandSeparator={true} prefix={"$"}/></span>
            </div>
          ))}
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
