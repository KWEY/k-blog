import React, { Component } from 'react';

class Article extends Component {
  render() {
    const article = {
      title: 123,
      time: 345,
      context: 'asdjkdfn',
    }
    return (
      <div class="kwe-article">
        <div class="kwe-title">
          <div class="kwe-name">{article.title}</div>
          <div class="kwe-time">{article.time}</div>
        </div>
        <div class="kwe-context" >{article.context}</div>
      </div>
    );
  }
}

export default Article;
