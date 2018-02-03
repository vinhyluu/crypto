import React from 'react';
import NumberFormat from 'react-number-format';

export default class coinInfo extends React.Component{
    render(){
        return(
            <div>
                {Object.keys(this.props.data).map((key) => (
                <div className="cryptoContainer">
                    <div className="coinImage coinColumn">
                        <h3>Symbol</h3>
                        <div className="coinContent">
                            <img src={`https://www.cryptocompare.com/${this.props.image}`} />
                        </div>
                    </div>

                    <div className="coinColumn">
                        <h3>Coin</h3>
                        <div className="coinContent">
                            <span className="coinText">{this.props.title}</span>
                        </div>
                    </div>

                    <div className="coinColumn">
                        <h3>Price</h3>
                        <div className="coinContent">
                            <span className="coinText"><NumberFormat value={this.props.value[key]} displayType={"text"} decimalScale={3} thousandSeparator={true} prefix={"$"} /></span>
                        </div>
                    </div>

                    <div className="coinColumn">
                        <h3>% Change (24 hours)</h3>
                        <div className="coinContent">
                            <span className="coinText" style={this.props.change < 0 ? { color: " red" } : { color: "green" }}>{this.props.change}%</span>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        )
    }
}
