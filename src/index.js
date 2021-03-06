import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routers from './router'
import {BrowserRouter}   from 'react-router-dom'
import Loading from './comom/loading'
import registerServiceWorker from './registerServiceWorker';


function Root(){
    return (
      <React.Fragment>
          <BrowserRouter>
              <Routers />
          </BrowserRouter>
        <Loading ref={(ref) =>
        {global.mLoadingComponentRef = ref}}/>
      </React.Fragment>
    );
}



ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
