import React, {Component} from 'react';
import './PostsFilter.scss';

class PostsFilter extends Component {
  chainList = ['golos', 'steem'];
  statusList = ['all', 'new', 'published', 'error', 'processing'];

  render() {
    const {chainFilter, statusFilter, onFilterChange} = this.props;
    return (
        <div className="filters">
          <div className="ui horizontal list">

            <div className="item">
              <div className="select">
                <select name='chainFilter' value={chainFilter} onChange={(e) => onFilterChange(e)}>
                  {
                    this.chainList.map(item =>
                        <option key={item} value={item}>{item}</option>
                    )};
                </select>
                <i className="dropdown icon"/>
              </div>
            </div>

            <div className="item">
              <div className="select">
                <select name='statusFilter' value={statusFilter} onChange={(e) => onFilterChange(e)}>
                  {
                    this.statusList.map(item =>
                        <option key={item} value={item}>{item}</option>
                    )
                  }
                </select>
                <i className="dropdown icon"/>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default PostsFilter;