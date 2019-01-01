import React, { Component } from 'react';
import TitleSvg from '../static/assets/title.svg';
import GithubSvg from '../static/assets/github.svg';
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
            <TitleSvg className="kwe-img"/>
          </div>
          <div className="kwe-title">{title}</div>
        </div>
        <div className="kwe-left-artList">
          <Collapse typeList={typeList}></Collapse>
        </div>
        <div className="kwe-left-link">
          <a href="https://github.com/KWEY" target="_blank">
            <GithubSvg className="kwe-github"/>
          </a>
        </div>
      </div>
    );
  }
}

export default Left;
