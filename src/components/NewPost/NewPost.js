import React, {Component} from 'react';
import './NewPost.scss';

class NewPost extends Component {
  render() {
    return (
        <div className="ui centered card piled segment">
          <div className="ui buttons">
            <button className="ui button disabled">Remove image</button>
            <button className="ui yellow button">Add</button>
          </div>
        </div>
    );
  }
}

export default NewPost;