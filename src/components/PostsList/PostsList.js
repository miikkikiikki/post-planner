import React, {Component} from 'react';
import './PostsList.scss';
import {Link} from "react-router-dom";
import moment from 'moment';
import PostsFilter from "../PostsFilter/PostsFilter";

class PostsList extends Component {

  openImage(url) {
    window.open(url);
  }

  dateFormat(date) {
    const local = moment(date).format("Do MMMM YYYY, k:mm:ss")
    const utc = moment.utc(date).format(" Do MMMM YYYY, k:mm:ss")
    return (
      <div>
        <p><b>Local: </b>{local}</p>
        <p><b>UTC:   </b>{utc}</p>
      </div>
    )
  }

  render() {
    const {posts, chainFilter, statusFilter, onFilterChange, deletePost} = this.props;
    const postsEl = posts.map((post) => {
      return (
          <tr key={post.id}>
            <td data-label="Name">{post.username}</td>
            <td data-label="Title">{post.title}</td>
            <td data-label="Image">
              <img onClick={() => this.openImage(post.body)}
                   className="ui mini rounded bordered image"
                   src={post.body}
                   alt=""
              />
            </td>
            <td data-label="PublishAt">{this.dateFormat(post.publish_at)}</td>
            <td data-label="Status">{post.status}</td>
            <td data-label="Action" className="center">
              <button className="tiny ui button"
                      onClick={() => deletePost(post.id)}
              >
                delete
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
              <th colSpan="6">
                <div>
                  <Link to="/posts/new" className="ui small primary labeled icon button">
                    <i className="file alternate icon" />Add Post</Link>
                </div>
              </th>
            </tr>
            </thead>
            <thead>
            <tr>
              <th colSpan="6">
                <PostsFilter chainFilter={chainFilter}
                             statusFilter={statusFilter}
                             onFilterChange={onFilterChange}/>
              </th>
            </tr>
            </thead>
            <thead>
            <tr>
              <th>User Name</th>
              <th>Title</th>
              <th>Image</th>
              <th>Publish at</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {postsEl}
            </tbody>
          </table>
        </div>
    );
  }
}

export default PostsList;