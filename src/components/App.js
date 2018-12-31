import React, { Component } from 'react';
// import logo from './logo.svg';
import '../static/less/app.less';
import LeftPanel from './leftPanel';
import RightPanel from './rightPanel';

class App extends Component {
  render() {
    return (
      <div className="kwe-index">
        <LeftPanel></LeftPanel>
        <RightPanel></RightPanel>
      </div>
    );
  }
}

export default App;
