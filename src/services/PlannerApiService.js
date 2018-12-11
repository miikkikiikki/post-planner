import {Component} from 'react';
import {api} from '../apiConfig';

class PlannerApiService extends Component {

  async sendRequest(method, url, body) {
    url = `${api.BASE}${url}`;

    let req = new Request(url, {
      method: method,
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': api.BASIC
      }),
      body: JSON.stringify(body)
    });

    const res = await fetch(req);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}`);
    }
    return await res.json();
  }

  getAllUsers() {
    return this.sendRequest('GET', '/users');
  }

  addNewUser(data) {
    return this.sendRequest('POST', '/users', data);
  }

  deleteUser(id) {
    return this.sendRequest('DELETE', `/users/${id}`);
  }

  getAllPosts() {
    return this.sendRequest('GET', '/posts');
  }

  addNewPost(data) {
    return this.sendRequest('POST', '/posts', data);
  }

  updatePost(id, data) {
    return this.sendRequest('PUT', `/posts/${id}`, data);
  }

  deletePost(id) {
    return this.sendRequest('DELETE', `/posts/${id}`);
  }
}

export default PlannerApiService;