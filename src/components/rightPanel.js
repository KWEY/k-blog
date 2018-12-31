import React, { Component } from 'react';
import '../static/less/right.less';

class RightPanel extends Component {
  render() {
    const directory = [];
    return (
      <div className="kwe-right">
        {
          directory.map((item) => (
            <div className="kwe-directory" key={item.id}>
                <div className="kwe-title">{item.title}</div>
                <div className="kwe-description">{item.description}</div>
                <div className="kwe-time">{item.time}</div>
            </div>
          ))
        }
      </div>
    );
  }
}

export default RightPanel;
