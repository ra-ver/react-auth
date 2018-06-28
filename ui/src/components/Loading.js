import React from 'react';
import ReactJson from 'react-json-view';
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
          <div>
            {' '}
            {this.props.token && (
              <div>
                <span className="loading">
                  {' '}
                  Authorization completed successfully.Token details:{' '}
                </span>{' '}
                {console.log(JSON.parse(this.props.token))}{' '}
                <ReactJson src={JSON.parse(this.props.token)} theme="monokai" />
              </div>
            )}{' '}
            {typeof this.props.token === 'undefined' && (
              <span className="loading"> Authorization not successfull </span>
            )}{' '}
          </div>
        )}{' '}
      </div>
    );
  }
}

export default Loading;
