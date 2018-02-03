import React from "react";
import axios from 'axios';
import swal from 'sweetalert';
import CoinInfo from './coinInfo';
import Header from './header';
import SearchForm from './searchForm';
import NumberFormat from 'react-number-format';

class MainPage extends React.Component{
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
                    
                    if(cryptoTitle == param || cryptoSymbol == param){
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
                    if (param == key || param == coinImgTitle){
                        imageArray.push(cryData[key].ImageUrl)
                    }
                }            

                for (let key in cryData) {
                    const coinImgTitle = cryData[key].CoinName.toUpperCase();

                    if (param == key || param == coinImgTitle) {
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
                            <Header value={this.state.marketCap}/>
                        </header>

                        <div className="formContainer">
                            <SearchForm search={this.handleSubmit} value={this.handleChange}/>
                        </div>
                    </div>
                </div>
                <div className="wrapper2">  
                    <CoinInfo image={this.state.cryImage} title={this.state.coinTitle} value={this.state.priceResults} change={this.state.percentChange} data={this.state.priceResults} />
                </div>
            </div>
            )
        }
    }

export default MainPage;