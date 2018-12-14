import React, {Component} from 'react';
import './NewPost.scss';
import PlannerApiService from "../../services/PlannerApiService";
import Calendar from "../Calendar/Calendar";

class NewPost extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: {},
      loading: true,
      activeUserId: 0,
      currentChain: 'steem',
      currentUser: '',
      currentCategory: 'animals',
      title: '',
      image: '',
      tags: ''
    };

    this.plannerApiService = new PlannerApiService();
  }

  chainList = ['steem', 'golos'];
  usersList = [];
  SteemCategory = ['animals', 'comics', 'crypto', 'funny', 'gaming', 'news', 'nsfw',
    'politics', 'sports', 'steem', 'technology'];
  GolosCategory = ['голос', 'игры', 'комикс', 'криптовалюта', 'юмор', 'животные',
    'новости', 'политика', 'спорт', 'технологии', 'nsfw'];

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    this.plannerApiService.getAllUsers().then(users => {
      if (users) {
        this.usersList = users
            .filter(user => (user.chain === this.state.currentChain.toUpperCase()));
      }
      this.setState({
        users: users,
        loading: false,
        currentUser: this.usersList[0].username
      });
    });
  }

  onInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  render() {
    const {users, loading, currentChain, currentUser, currentCategory, title, image, tags} = this.state;
    let currentCategoryList = currentChain === 'steem' ? this.SteemCategory : this.GolosCategory;
    if (loading) {
      return <div className="ui active centered inline loader"/>;
    }

    if (users.length === 0) {
      return (<p>No users found. Please add users first.</p>)
    }

    const chainList = this.chainList
        .map(item =>
            <option key={item} value={item}>{item}</option>
        );

    const usersList = users
        .filter(user => (user.chain === currentChain.toUpperCase()))
        .map(user =>
            <option key={user.id} value={user.id}>{user.username}</option>
        );

    currentCategoryList = currentCategoryList
        .map(item =>
            <option key={item} value={item}>{item}</option>
        );


    return (
        <div className="ui raised segment">
          <h2 className="ui dividing header">Add new Post</h2>

          <form className="ui form">

            <div className="field">
              <label>Select Chain</label>
              <div className="select">
                <select name='currentChain' value={currentChain} onChange={this.onInputChange}>
                  {chainList};
                </select>
                <i className="dropdown icon"/>
              </div>
            </div>

            <div className="field">
              <label>Select User</label>
              <div className="select">
                <select name='currentUser' value={currentUser} onChange={this.onInputChange}>
                  {usersList}
                </select>
                <i className="dropdown icon"/>
              </div>
            </div>

            <div className="field">
              <label>Select Category</label>
              <div className="select">
                <select name='currentCategory' value={currentCategory} onChange={this.onInputChange}>
                  {currentCategoryList}
                </select>
                <i className="dropdown icon"/>
              </div>
            </div>

            <div className="field">
              <label>Title</label>
              <input name="title" type="text" placeholder="Title"
                     value={title} onChange={this.onInputChange}/>
            </div>

            <div className="field">
              <label>Image Url</label>
              <input name="image" type="text" placeholder="Link to image source"
                     value={image} onChange={this.onInputChange}/>
            </div>

            <div className="field">
              <label>Tags</label>
              <input name="tags" type="text" placeholder="Tags"
                     value={tags} onChange={this.onInputChange}/>
            </div>

            <div className="field">
              <Calendar/>
            </div>

            <button
                className="ui button" type="submit">Submit
            </button>
          </form>
        </div>
    );
  }
}

export default NewPost;