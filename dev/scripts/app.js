import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from "./mainPage";

class App extends React.Component {

  render() {
    return (
      <div>
        <MainPage />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));


