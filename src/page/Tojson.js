import React, { Component } from 'react';

class Tojson extends Component {
  render() {
    return (
      <div className="kwe-json">
        <div className="kwe-json-title">
          <div className="kwe-type">type: </div>
          {/* <select className="kwe-type-input" v-model="selected">
            <option v-for="item in typeList" :value ="item.pid" :key="item.pid">{{item.name}}</option>
          </select> */}
          <div className="kwe-title">title: </div>
          <input className="kwe-title-input" type="text" value="title"/>
        </div>
        <div className="kwe-json-description">
          <div className="kwe-description">description: </div>
          <input className="kwe-description-input" type="text" value="description"/>
        </div>
        <div className="kwe-json-context">
          <p className="kwe-context">context: </p>
          <div className="kwe-context-input" ref="editor"></div>
        </div>
        <div className="kwe-download" onClick="download">下载</div>
      </div>
    );
  }
}

export default Tojson;
