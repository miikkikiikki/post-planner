import React, {Component} from 'react';
import './NewUser.scss';
import PlannerApiService from "../../services/PlannerApiService";
import {Redirect} from 'react-router-dom';

class NewUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSteem: false,
      userName: '',
      postingKey: '',

      touched: {
        userName: false,
        postingKey: false,
      },
      redirect: false
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  plannerApiService = new PlannerApiService();

  onInputChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: {...this.state.touched, [field]: true},
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.canBeSubmitted()) {
      return;
    }

    const data = {
      chain: this.state.isSteem ? 'STEEM' : 'GOLOS',
      username: this.state.userName,
      posting_key: this.state.postingKey
    };
    this.plannerApiService.addNewUser(data).then(result => {
      if (result) {
        this.setState({
          redirect: true
        });
      }
    })
  };

  validate(userName, postingKey) {
    return {
      userName: userName.length < 3,
      postingKey: postingKey.length < 8,
    };
  }

  canBeSubmitted() {
    const errors = this.validate(this.state.userName, this.state.postingKey);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  render() {
    const errors = this.validate(this.state.userName, this.state.postingKey);
    const isDisabled = Object.keys(errors).some(x => errors[x]);

    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];

      return hasError ? shouldShow : false;
    };

    if (this.state.redirect) {
      return <Redirect to="/users"/>
    }

    return (
        <div className="ui raised segment">
          <form className="ui form" onSubmit={this.onSubmit}>
            <h2 className="ui dividing header">Add new User</h2>

            <div className="field">
              <div className="ui slider checkbox">
                <input type="checkbox" name="isSteem" id="checkbox"
                       checked={this.state.isSteem} onChange={this.onInputChange}/>
                <label htmlFor="checkbox">{this.state.isSteem ? 'STEEM' : 'GOLOS'}</label>
              </div>
            </div>

            <div className={shouldMarkError('userName') ? 'field error' : 'field'}>
              <label>User name</label>
              <input name="userName" type="text" placeholder="user name"
                     value={this.state.userName} onChange={this.onInputChange}
                     onBlur={this.handleBlur('userName')}/>

            </div>

            <div className={shouldMarkError('postingKey') ? 'field error' : 'field'}>
              <label>Posting Key</label>
              <input name="postingKey" type="password" placeholder="private posting key"
                     value={this.state.postingKey} onChange={this.onInputChange}
                     onBlur={this.handleBlur('postingKey')}/>
            </div>

            <button disabled={isDisabled}
                    className="ui button" type="submit">Submit
            </button>
          </form>
        </div>
    );
  }
}

export default NewUser;