import React from 'react';
import NumberFormat from 'react-number-format';

export default class Header extends React.Component{
    render(){
        return(
            <div>
                <h1 className="mainTitle">CryptoCoin<span className="dot">.</span></h1>
                <div className="marketCapContainer">
                    <h2>Total Market Cap</h2>
                    <span className="marketCapNumber"><NumberFormat value={this.props.value} displayType={"text"} decimalScale={2} thousandSeparator={true} prefix={"$"} /></span>
                </div>
            </div>
        )
    }
}