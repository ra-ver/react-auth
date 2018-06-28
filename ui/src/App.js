import React, { Component } from 'react';

import { STATUS, Loading, Avatar, Logo, Logotype, Container, Header } from './components';

const CLIENT_ID = 'ErXdwNUgWfk3vhEobdICL9M2tgE8IKqseErlbrtY';
const REDIRECT_URI = 'http%3A%2F%2Flocalhost%3A3000';
const SCOPE = 'openid';
const RESPONSE_TYPE = 'code';

class App extends Component {
  state = {
    status: STATUS.INITIAL,
    token: null,
  };
  componentDidMount() {
    const code =
      window.location.href.match(/\?code=(.*)/) && window.location.href.match(/\?code=(.*)/)[1];
    if (code) {
      this.setState({
        status: STATUS.LOADING,
      });
      fetch(`http://localhost:9999/authenticate/${code}`)
        .then(response => response.json())
        .then(({ token }) => {
          this.setState({
            token,
            status: STATUS.FINISHED_LOADING,
          });
        });
    }
  }
  render() {
    return (
      <Container>
        <Header>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Logo />
            <Logotype />
          </div>{' '}
          <Avatar
            style={{
              transform: `scale(${this.state.status === STATUS.AUTHENTICATED ? '1' : '0'})`,
            }}
          />{' '}
          <a
            style={{
              display: this.state.status === STATUS.INITIAL ? 'inline' : 'none',
            }}
            href={`https://gen3qa.kids-first.io/user/oauth2/authorize?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}`}
          >
            Authorize{' '}
          </a>{' '}
        </Header>{' '}
        <Loading
          status={this.state.status}
          token={this.state.token}
          callback={() => {
            if (this.props.status !== STATUS.AUTHENTICATED) {
              this.setState({
                status: STATUS.AUTHENTICATED,
              });
            }
          }}
        />{' '}
      </Container>
    );
  }
}

export default App;
