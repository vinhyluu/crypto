import React from 'react';

export default class SearchForm extends React.Component{
    render(){
        return(
            <div>
                <form action="" onSubmit={this.props.search} className="searchForm">
                    <div className="leftCoin">
                        <label htmlFor="crySearch"></label>
                        <input type="text" id="enteredCoinLeft" name="enteredLeft" onChange={this.props.value} className="searchInput" placeholder="Search for crypto coin information here" autoComplete="off" />
                        <button type="submit" className="magnify"><span className="sr-only">Magnifying glass that's also a search button</span><i className="fa fa-search" aria-hidden="true"></i></button>
                    </div>
                </form>
            </div>
        )
    }
}