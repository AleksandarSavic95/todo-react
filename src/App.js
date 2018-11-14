import React, { Component } from 'react';
import { Loading } from './components/common/';
import Auth from './screens/Auth';
import LoggedIn from './screens/LoggedIn';

import deviceStorage from './services/deviceStorage';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jwt: '',
      loading: true
    }
    // NOTE: binding functions from service to App! TODO: separation of duties..
    this.deleteJWT = deviceStorage.deleteJWT.bind(this);
    this.loadJWT = deviceStorage.loadJWT.bind(this);

    this.loadJWT();
  }

  setJWT = (jwt) => {
    this.setState({
      jwt: jwt
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <Loading size={'large'} />
       );
    } else if (!this.state.jwt) {
      return (
        <Auth setJWT={this.setJWT} />
      );
    } else if (this.state.jwt) {
      return (
        <LoggedIn deleteJWT={this.deleteJWT} />
      );
    }
  }
}