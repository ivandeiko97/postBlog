import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';
import Blog from './components/Blog';
import reducer from './redux/reducer';
import PostListHandler from './components/blogList/PostListHandler';
import ViewedPostHandler from './components/blogList/post/ViewedPostHandler';
import Add from './components/add/Add';
import './App.css';

const store = createStore(reducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Blog>
          <Switch>
            <Route exact path="/" component={PostListHandler} />
            <Route path="/add" component={Add} />
            <Route path="/posts/:id/" component={ViewedPostHandler} />
          </Switch>
        </Blog>
      </Router>     
    </Provider>
  );
}

export default App;
