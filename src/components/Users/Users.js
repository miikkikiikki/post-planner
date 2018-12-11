import React, {Component} from 'react';
import './Users.scss';
import PlannerApiService from "../../services/PlannerApiService";
import UsersList from "../UsersList/UsersList";

class Users extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: {},
      loading: true,
      deleteProgress: false,
      activeUserId: 0
    };

    this.plannerApiService = new PlannerApiService();
  }


  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    this.plannerApiService.getAllUsers().then(users => {
      this.setState({
        users: users,
        loading: false
      });
    });
  }

  deleteUser = (id) => {
    this.setState({
      deleteProgress: true,
      activeUserId: id
    }, () => {
      this.plannerApiService.deleteUser(id).then(result => {
        if (result) {
          this.setState(({users}) => {
            const idx = users.findIndex((el) => el.id === id);
            const newArray = [...users.slice(0, idx), ...users.slice(idx + 1)];

            return {
              users: newArray,
              deleteProgress: false
            }
          })
        }
      })
    });

  };

  render() {
    const {users, loading, deleteProgress, activeUserId} = this.state;
    const loader = <div className="ui active centered inline loader"/>;
    const content = loading ? loader : <UsersList users={users}
                                                  deleteProgress={deleteProgress}
                                                  activeUserId={activeUserId}
                                                  deleteUser={this.deleteUser}/>;
    return (
        <div className="ui one column centered grid">
          <div className="column">
            {content}
          </div>
        </div>
    );
  }
}

export default Users;