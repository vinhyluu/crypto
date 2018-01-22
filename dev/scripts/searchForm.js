import React from "react";
import PriceResult from "./priceResult"
import axios from 'axios';

const NumberFormat = require("react-number-format");

class SearchForm extends React.Component{
    constructor(){
        super();
        this.state = {
            cryUrl: "https://www.cryptocompare.com/",
            currentSearch: "",
            priceResults: [],
            cryImage: [],

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cryPrice = this.cryPrice.bind(this);
        this.searchImage = this.searchImage.bind(this);
    }

    cryPrice(param){
        axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${param}&tsyms=CAD`)
            .then(res => {
                const cryptos = res.data;
                // console.log(cryptos);
                this.setState({
                    priceResults: cryptos
                })
            })
        }

    searchImage(param) {
        axios.get(`https://min-api.cryptocompare.com/data/all/coinlist`)
            .then(res => {
                const cryImage = res.data.Data;
                const imageArray = []

                for (let key in cryImage) {
                    if(param===key){
                    imageArray.push(cryImage[key].ImageUrl)
                }
            }
            console.log(imageArray);

            this.setState({
                cryImage: imageArray
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
                        <h1>CrytpoAnalyze</h1>
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
                            <span className="title">{key}</span>
                            <span className="value"><NumberFormat value={this.state.priceResults[key].CAD} displayType={"text"} decimalprecision={2} thousandSeparator={true} prefix={"$"} /></span>
                            <div>
                                <img src={`https://www.cryptocompare.com/${this.state.cryImage}`} />
                            </div>
                        </div>
                    ))}
                </div>

                <div>
                </div>
            </div>
        )
    }
}

export default SearchForm;