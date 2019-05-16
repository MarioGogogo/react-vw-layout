import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Loading from './comom/modal'
import registerServiceWorker from './registerServiceWorker';


function Root(){
    return (
      <React.Fragment>
        <App />
        <Loading ref={(ref) =>
        {global.mLoadingComponentRef = ref}}/>
      </React.Fragment>
    );
}



ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
