import React, {Component} from 'react';
import './App.scss';
import AppHeader from '../AppHeader/AppHeader';

import {BrowserRouter as Router, Route} from 'react-router-dom';
import Users from "../Users/Users";
import Posts from "../Posts/Posts";
import NewUser from "../NewUser/NewUser";
import NewPost from "../NewPost/NewPost";

class App extends Component {

  render() {
    const welcomeScreen = <div className="ui center aligned segment">
      <h1 className="ui header">Welcome to Post Planner</h1>
      <h2>Do whatever you want when you want to.</h2></div>;
    return (
        <Router>
          <div className="App">
            <AppHeader/>
            <div className="ui container">
              <Route path="/" render={() => welcomeScreen} exact={true}/>
              <Route path="/users" component={Users} exact={true}/>
              <Route path="/users/new" component={NewUser} exact={true}/>
              <Route path="/posts" component={Posts} exact={true}/>
              <Route path="/posts/new" component={NewPost} exact={true}/>
            </div>
          </div>
        </Router>
    );
  }
}

export default App;
