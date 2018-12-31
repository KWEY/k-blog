import React, { Component } from 'react';
import './less/collapse.less';

class Collapse extends Component {
  render() {
    const typeList = this.props.typeList;
    return (
      <div className="eui-collapse">
      {
        typeList.list.map((item, index) => (
          <div
            className={index === typeList.value ? 'active eui-list' : 'eui-list'}
            key={index}>
              <p className="eui-name" onClick="toogle(index)">{item.name}</p>
              <List item={item}/>
            </div>
        ))
      }
        
      </div>
    );
  }
}
class List extends Component {
  render() {
    const item = this.props.item;
    return (
      <ul className="eui-wrap">
      {
        item.list.map((data,index) => (
          <li className="eui-item" key={index}>
            {data.name}
          </li>
        ))
      }
    </ul>
    )
  }
}
export default Collapse;
