import React, { Component } from 'react';
// import logo from './logo.svg';
import '../static/less/index.less';
import LeftPanel from '../components/LeftPanel';
import RightPanel from '../components/RightPanel';
import Form from '../components/Form';

class App extends Component {
  render() {
    return (
      <div className="kwe-index">
        <LeftPanel></LeftPanel>
        <RightPanel></RightPanel>
        {/* <Form/> */}
      </div>
    );
  }
}

export default App;
