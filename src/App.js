import React, { Component } from 'react';

import CSSModules from 'react-css-modules';
import styles from './App.less'
import Loading from './comom/modal'



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {clicks: 0};
  }
  _onclick = ()=>{
    this.setState(prevState => ({
      clicks: prevState.clicks + 1
    }));
  }
  render() {

    return (
      <div styleName="App">
        hello vw-layout Number of clicks: {this.state.clicks}
        <div styleName="sls">体育</div>
        <div styleName="sls">新闻</div>
        <div styleName="sls">政治</div>
        <div styleName="sls">娱乐</div>
        <div styleName="sls">公益</div>
        <button onClick={this._onclick}>提交看这里</button>
        <Loading />
      </div>
    );
  }
}




const NewApp = CSSModules(App, styles)

export default NewApp

