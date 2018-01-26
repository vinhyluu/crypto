import React from "react";
// import PriceResult from "./priceResult"
import axios from 'axios';
import swal from 'sweetalert';
import NumberFormat from 'react-number-format';

class SearchForm extends React.Component{
    constructor(){
        super();
        this.state = {
            currentSearch: "",
            priceResults: [],
            cryImage: [],
            coinTitle: [],
            marketCap: "",
            percentChange: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cryPrice = this.cryPrice.bind(this);
        this.searchImage = this.searchImage.bind(this);
    }
 
    componentDidMount(){
        axios.get(`https://api.coinmarketcap.com/v1/global/?convert=CAD`)
            .then(res => {
                const market = res.data.total_market_cap_cad;
                console.log(market);   
    
            this.setState({
                marketCap: market
            })
        })
    }

    cryPrice(param){
        axios.get(`https://api.coinmarketcap.com/v1/ticker/?convert=CAD&limit=0`)
            .then(res => {
                const cryptos = res.data;
                const price = []
                const percentChange = []

                console.log(cryptos);

                for(let title in cryptos){
                    const cryptoTitle = cryptos[title].name.toUpperCase();
                    const cryptoSymbol = cryptos[title].symbol.toUpperCase();
                    
                    if(cryptoTitle === param || cryptoSymbol === param){
                        price.push(cryptos[title].price_usd);       
                        percentChange.push(cryptos[title].percent_change_24h);
                    }
                }

                this.setState({
                    priceResults: price,
                    percentChange 
                })

                function isEmpty(obj) {
                    for (const key in obj) {
                        if (obj.hasOwnProperty(key))
                            return false;
                    }
                    return true;
                }

                if(isEmpty(price)){
                    swal("Sorry!", "That coin doesn't exist. Please try again.", "warning");
                }
            })
        }
        

    searchImage(param) {
        axios.get(`https://min-api.cryptocompare.com/data/all/coinlist`)
            .then(res => {
                const cryData = res.data.Data;
                const imageArray = []
                const coinTitle = []

                for (let key in cryData) {
                    const coinImgTitle = cryData[key].CoinName.toUpperCase();
                    if (param === key || param === coinImgTitle){
                        imageArray.push(cryData[key].ImageUrl)
                    }
                }            

                for (let key in cryData) {
                    const coinImgTitle = cryData[key].CoinName.toUpperCase();

                    if (param === key || param === coinImgTitle) {
                        coinTitle.push(cryData[key].FullName)
                    }
                }
                
            this.setState({
                cryImage: imageArray,
                coinTitle
            })
        })
    }
   
    handleChange(e){
        const currentSearchValue = e.target.value.toUpperCase();
        this.setState({
            currentSearch: currentSearchValue
        })
        console.log(currentSearchValue);
    }

    handleSubmit(e){
        e.preventDefault();
        this.cryPrice(this.state.currentSearch);
        this.searchImage(this.state.currentSearch);
        this.setState({
            currentSearch: ""
        })
    }


    render(){
        return(
            <div>
                <div className="wrapper">
                    <div className="wrapper2">
                        <header>
                            <h1 className="mainTitle">CryptoCoin<span className="dot">.</span></h1>
                            <div className="marketCapContainer">
                                <h2>Total Market Cap</h2>
                                <span className="marketCapNumber"><NumberFormat value={this.state.marketCap} displayType={"text"} decimalScale={2} thousandSeparator={true} prefix={"$"} /></span>

                            </div>
                        </header>

                        <div className="formContainer">
                            <form action="" onSubmit={this.handleSubmit} className="searchForm">
                                <div className="leftCoin">
                                    <label htmlFor="crySearch"></label>
                                    <input type="text" id="enteredCoinLeft" name="enteredLeft" onChange={this.handleChange} className="searchInput" placeholder="Search for crypto coin information here" autocomplete="off" />
                                    <button type="submit" className="magnify"><span className="sr-only">Magnifying glass that's also a search button</span><i className="fa fa-search" aria-hidden="true"></i></button>
                                </div>                  
                            </form>
                        </div>
                    </div>
                </div>
                    
                
                    <div className="wrapper2">  
                        {Object.keys(this.state.priceResults).map((key) => (
                            <div className="cryptoContainer">
                                <div className="coinImage coinColumn">
                                    <h3>Symbol</h3> 
                                    <div className="coinContent">
                                        <img src={`https://www.cryptocompare.com/${this.state.cryImage}`} />
                                    </div>
                                </div>

                                <div className="coinColumn">
                                    <h3>Coin</h3>
                                    <div className="coinContent">
                                        <span className="coinText">{this.state.coinTitle}</span>
                                    </div>
                                </div>

                                <div className="coinColumn">    
                                    <h3>Price</h3>
                                    <div className="coinContent">
                                        <span className="coinText"><NumberFormat value={this.state.priceResults[key]} displayType={"text"} decimalScale={2} thousandSeparator={true} prefix={"$"} /></span>
                                    </div>
                                </div>

                                <div className="coinColumn">
                                    <h3>% Change (24 hours)</h3>
                                    <div className="coinContent">
                                    <span className="coinText" style={this.state.percentChange < 0 ? {color: " red"} : {color: "green"}}>{this.state.percentChange}%</span> 
                                    </div> 
                                </div>      
                            </div>
                        ))}
                    </div>
                </div>
            )
        }
    }

export default SearchForm;