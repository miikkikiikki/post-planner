import React, {Component} from 'react';
import './Posts.scss';
import PlannerApiService from "../../services/PlannerApiService";
import PostsList from "../PostsList/PostsList";

class Posts extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: {},
      posts: {},
      loading: true,
      chainFilter: 'golos',
      statusFilter: 'new'
    };

    this.plannerApiService = new PlannerApiService();
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const requests = [
      this.plannerApiService.getAllUsers(),
      this.plannerApiService.getAllPosts()
    ];

    Promise.all(requests).then((request) => {
      const users = request[0];
      const posts = request[1];
      posts.forEach(post => {
        post.username = users.find(user => (user.id === post.user_id)).username;
      });
      this.setState({
        users: users,
        posts: posts,
        loading: false
      });
    });
  }

  filter(posts, chainFilter, statusFilter) {
    return posts.filter(post => {
      if (statusFilter === "all") return true;
      return post.status === statusFilter.toUpperCase();
    }).filter(post => {
      return chainFilter.toUpperCase() === (this.state.users.find(user => (user.id === post.user_id))).chain;
    });
  }

  onFilterChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
  };

  render() {
    let {posts, loading, chainFilter, statusFilter} = this.state;
    const loader = <div className="ui active centered inline loader"/>;

    if (!loading) {
      posts = this.filter(posts, chainFilter, statusFilter);
      posts.sort((a, b) => {
        return new Date(a.publish_at) - new Date(b.publish_at)
      });
    }
    const content = loading ? loader : <PostsList posts={posts}
                                                  chainFilter={chainFilter}
                                                  statusFilter={statusFilter}
                                                  deleteUser={this.deleteUser}
                                                  onFilterChange={this.onFilterChange}/>;

    return (
        <div className="ui one column centered grid">
          <div className="column">
            {content}
          </div>
        </div>
    );
  }
}

export default Posts;