import React from 'react';

import STATUS from './status';

import './Loading.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="loading">
        {' '}
        {this.props.status !== STATUS.FINISHED_LOADING && (
          <div
            style={{
              position: 'absolute',
            }}
          >
            <span className="loading"> Authorization Pending </span>{' '}
          </div>
        )}{' '}
        {this.props.status === STATUS.FINISHED_LOADING && (
          <div
            style={{
              position: 'absolute',
            }}
          >
            <span className="loading"> Authorization Process Complete </span>{' '}
          </div>
        )}{' '}
      </div>
    );
  }
}

export default Loading;
