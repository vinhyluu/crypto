import React from "react";
// import PriceResult from "./priceResult"
import axios from 'axios';
import NumberFormat from 'react-number-format';


class SearchForm extends React.Component{
    constructor(){
        super();
        this.state = {
            currentSearch: "",
            priceResults: [],
            cryImage: [],
            coinTitle: [],

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cryPrice = this.cryPrice.bind(this);
        this.searchImage = this.searchImage.bind(this);
    }

    // cryPrice(param){
    //     axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${param}&tsyms=CAD`)
    //         .then(res => {
    //             const cryptos = res.data;
    //             const price = []
    //             console.log(cryptos);

    //             for(let title in cryptos){
    //                 price.push(cryptos[title].CAD);
    //             }
    //             this.setState({
    //                 priceResults: price
    //             })
    //         })
    //     }

    cryPrice(param){
        axios.get(`https://api.coinmarketcap.com/v1/ticker/?limit=0`)
            .then(res => {
                const cryptos = res.data;
                const price = []
                console.log(cryptos);

                for(let title in cryptos){
                    console.log(cryptos[title].symbol);

                    if(cryptos[title].name == param || cryptos[title].symbol == param){
                        price.push(cryptos[title].price_usd);       
                    }
                }

                console.log(price);
                this.setState({
                    priceResults: price
                })
            })
        }

    searchImage(param) {
        axios.get(`https://min-api.cryptocompare.com/data/all/coinlist`)
            .then(res => {
                const cryData = res.data.Data;
                const imageArray = []
                const coinTitle = []

                // console.log(cryData);

                for (let key in cryData) {
                    // for(let title in cryData[key]){
                    //     console.log(cryData[key]);
                        // console.log(title);
                        // console.log(key);
                        // console.log(cryData[key].CoinName)
                    if (param === key || param === cryData[key].CoinName){
                        imageArray.push(cryData[key].ImageUrl)
                    }
                }            

                for (let key in cryData) {
                    if (param === key || param === cryData[key].CoinName) {
                        // console.log(cryData[key])
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
        const currentSearchValue = e.target.value;
        this.setState({
            currentSearch: currentSearchValue
        })
        // console.log(currentSearchValue);
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
                <div>
                    <header>
                        <h1>CryptoAnalyze</h1>
                    </header>
                    <div className="formContainer">
                        <form action="" onSubmit={this.handleSubmit}>
                            <div className="leftCoin">
                                <label htmlFor="crySearch"></label>
                                <input type="text" id="enteredCoinLeft" name="enteredLeft" onChange={this.handleChange} />
                            </div>
                            {/* <div className="rightCoin">
                                <label htmlFor="crySearch"></label>
                                <input type="text" result={this.props.search} id="enteredRight" name="enteredRight" onChange={e => this.handleChange(e.target.value)} value={this.state.formValues[name]} />
                            </div> */}
                            <div className="searchButton">
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                    
                    {/* put this into a component using props and then have another propped component that will render the image */}

                    {Object.keys(this.state.priceResults).map((key) => (
                        <div className="cryptoContainer">
                            <span className="title">{this.state.coinTitle}</span>
                            <span className="price"><NumberFormat value={this.state.priceResults[key]} displayType={'text'} thousandSeparator={true} prefix={'$'} isNumericString={true} decimalprecision={2}/> </span>
                            <div>
                                <img src={`https://www.cryptocompare.com/${this.state.cryImage}`} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default SearchForm;