import React, { Component } from 'react';
// import titleSvg from './logo.svg';
// import githubSvg from './logo.svg';
import '../static/less/left.less';
import Collapse from '../ui/collapse';

class Left extends Component {
  render() {
    const title = '雪人';
    const typeList = {
      list: [],
    };
    return (
      <div className="kwe-left">
        <div className="kwe-left-info">
          <div className="kwe-wrap">
            {/* <titleSvg className="kwe-img"/> */}
          </div>
          <div className="kwe-title">{title}</div>
        </div>
        <div className="kwe-left-artList">
          <Collapse typeList={typeList}></Collapse>
        </div>
        <div className="kwe-left-link">
          <a href="https://github.com/KWEY" target="_blank">
            {/* <githubSvg className="kwe-github"/> */}
          </a>
        </div>
      </div>
    );
  }
}

export default Left;
