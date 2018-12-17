import React, { Component } from 'react';
import './NewPost.scss';
import PlannerApiService from '../../services/PlannerApiService';
import Calendar from '../Calendar/Calendar';
import { Redirect } from 'react-router-dom';

class NewPost extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: {},
      loading: true,
      activeUserId: 0,
      currentChain: 'STEEM',
      currentUserId: '',
      currentCategory: 'animals',
      title: '',
      image: '',
      tags: '',
      touched: {
        title: false,
        image: false,
        tags: false,
      },
      calendarValue: new Date(),
      redirect: false
    };

    this.plannerApiService = new PlannerApiService();
  }

  chainList = ['STEEM', 'GOLOS'];
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
          .filter(user => (user.chain === this.state.currentChain));
      }
      this.setState({
        users: users,
        loading: false,
        currentUserId: this.usersList[0].id
      });
    });
  }

  calendarChangeHandler = (date) => {
    this.setState({ calendarValue: date })
  };

  onInputChange = (e) => {
    const target = e.currentTarget;
    // console.log(target):
    const value = target.value;
    const name = target.name;
    if (name === 'currentUserId') {
      this.setState({
        [name]: Number(value)
      });
    } else {
      this.setState({
        [name]: value
      });
    }
  };

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.canBeSubmitted()) {
      return;
    }

    const data = {
      user_id: this.state.currentUserId,
      type: 'meme',
      title: this.state.title,
      body: this.state.image.trim(),
      tags: [].concat(this.state.tags.split(',')),
      settings: JSON.stringify({
        boost: { uplift: 20000 }
      }),
      publish_at: this.state.calendarValue.toISOString(),
    };

    this.plannerApiService.addNewPost(data)
      .then(result => {
        if (result) {
          this.setState({
            redirect: true
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  validate(title, image, tags) {
    return {
      title: title.length < 3,
      image: !(image.length > 0),
      tags: this.validateTags(tags),
    };
  }

  validateTags = (tags) => {
    if (tags.length === 0) {
      return true
    } else {
      const tagsArr = [].concat(tags.split(','));
      return tagsArr.some(tag => {
        return tag.length > 4
      })
    }
  };

  canBeSubmitted() {
    const errors = this.validate(this.state.title, this.state.image, this.state.tags);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  render() {

    if (this.state.redirect) {
      return <Redirect to="/posts"/>
    }

    const errors = this.validate(this.state.title, this.state.image, this.state.tags);
    const isDisabled = Object.keys(errors).some(x => errors[x]);

    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];

      return hasError ? shouldShow : false;
    };

    const { users, loading, currentChain, currentUserId, currentCategory, title, image, tags } = this.state;
    let currentCategoryList = currentChain === 'STEEM' ? this.SteemCategory : this.GolosCategory;
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

        <form className="ui form" onSubmit={this.onSubmit}>

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
              <select name='currentUserId' value={currentUserId} onChange={this.onInputChange}>
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

          <div className={shouldMarkError('title') ? 'field error' : 'field'}>
            <label>Title</label>
            <input name="title" type="text"
                   placeholder="Title"
                   value={title}
                   onChange={this.onInputChange}
                   onBlur={this.handleBlur('title')}
            />
          </div>

          <div className={shouldMarkError('image') ? 'field error' : 'field'}>
            <label>Image Url</label>
            <input name="image" type="text"
                   placeholder="Link to image source"
                   value={image}
                   onChange={this.onInputChange}
                   onBlur={this.handleBlur('image')}
            />
          </div>

          <div className={shouldMarkError('tags') ? 'field error' : 'field'}>
            <label>Tags</label>
            <input name="tags" type="text"
                   placeholder="Tags"
                   value={tags}
                   onChange={this.onInputChange}
                   onBlur={this.handleBlur('tags')}
            />
          </div>

          <div className="field">
            <Calendar
              onChange={this.calendarChangeHandler}
              value={this.state.calendarValue}
            />
          </div>

          <button
            disabled={isDisabled}
            className="ui button"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default NewPost;
