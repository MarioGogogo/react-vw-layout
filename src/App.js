import React, { Component } from 'react';

import CSSModules from 'react-css-modules';
import styles from './App.less'

class App extends Component {
  render() {
    return (
      <div styleName="App">
        hello vw-layout
        <div styleName="sls">体育</div>
        <div styleName="sls">新闻</div>
        <div styleName="sls">政治</div>
        <div styleName="sls">娱乐</div>
        <div styleName="sls">公益</div>
      </div>
    );
  }
}

const NewApp = CSSModules(App, styles)

export default NewApp

