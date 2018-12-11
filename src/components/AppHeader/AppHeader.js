import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import './AppHeader.scss';

class AppHeader extends Component {

  render() {
    return (
        <div>
          <div className="ui menu fixed">
            <Link to='/' className="header item">Post Planner</Link>
            <NavLink to='/users' exact={true} className="item" activeClassName="active">Users</NavLink>
            <NavLink to='/posts' exact={true} className="item" activeClassName="active">Posts</NavLink>
          </div>
        </div>
    );
  }
}

export default AppHeader;