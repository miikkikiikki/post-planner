import React, {Component} from 'react';
import './UsersList.scss';
import {Link} from 'react-router-dom';

class UsersList extends Component {

  render() {

    const {users, deleteUser, deleteProgress, activeUserId} = this.props;
    const usersEl = users.map((user) => {
      return (
          <tr key={user.id}>
            <td data-label="Id">{user.id}</td>
            <td data-label="Name">{user.username}</td>
            <td data-label="Chain">{user.chain}</td>
            <td data-label="Action" className="center">
              <button className={deleteProgress && activeUserId === user.id ?
                  "loading tiny ui button" : "tiny ui button"}
                      onClick={() => deleteUser(user.id)}>delete
              </button>
            </td>
          </tr>
      )
    });

    return (
        <div>
          <table className="ui selectable striped unstackable celled table">
            <thead>
            <tr>
              <th colSpan="4">
                <Link to="/users/new" className="ui small primary labeled icon button">
                  <i className="user icon"></i> Add User
                </Link>
              </th>
            </tr>
            </thead>
            <thead>
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>Chain</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {usersEl}
            </tbody>
          </table>
        </div>
    );
  }
}

export default UsersList;