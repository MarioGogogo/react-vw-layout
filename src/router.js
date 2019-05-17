import  React from 'react'
import {Switch,Route}  from 'react-router-dom'
import App from './App';
import Login from './components/login'
import PostsDetail from './components/posts'
import PostList  from './components/posts/list'

function Routers() {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/login' component={Login} />
        <Route path='/posts' component={Posts} />
      </Switch>
    </main>
  );
}

const Posts = ({match}) =>{
    return (<React.Fragment>
         <Route path={`${match.url}/:id`} component={PostsDetail} />
         <Route exact path={match.url} component={PostList} />
         </React.Fragment>
    )
}


export default Routers;

