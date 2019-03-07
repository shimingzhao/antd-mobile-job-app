import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="frostedglass">
          <div className="frostedglass-inner">前端开发</div>
        </div> 
        <div className="frostedglass">
          <div className="frostedglass-inner">HTML</div>
        </div>
      </div>
    );
  }
}

export default App;
