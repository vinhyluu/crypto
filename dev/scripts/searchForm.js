import React from "react";

export default class SearchForm extends React.Component{
    constructor(){
        super();
        this.state = {
            formValues: {}
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        e.preventDefault();
        let formValues = this.state.formValues;
        let name = e.target.name;
        let value = e.target.value;

        formValues[name] = value; 

        this.setState({
            formValues
        })
    }

    render(){
        return(
            <div>
                <div className="formContainer">
                    <form action="">
                        <div className="leftCoin">
                            <label htmlFor="crySearch"></label>
                            <input type="text" id="enteredCoinLeft" name="enteredLeft" onChange={this.handleChange} value={this.state.formValues["enteredLeft"]}/>
                        </div>
                        <div className="rightCoin">
                            <label htmlFor="crySearch"></label>
                            <input type="text" id="enteredRight" name="enteredRight" onChange={this.handleChange} value={this.state.formValues["enteredRight"]} />
                        </div>
                        <div className="searchButton">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}