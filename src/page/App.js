import React, { Component } from 'react';
// import logo from './logo.svg';
import '../static/less/app.less';
import LeftPanel from '../components/leftPanel';
import RightPanel from '../components/rightPanel';

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
