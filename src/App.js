import React, { Component } from 'react';
import { Loading } from './components/common/';
import Auth from './screens/Auth';
import LoggedIn from './screens/LoggedIn';

import { StyleSheet, View, ListView, Keyboard } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jwt: '',
    }
  }

  render() {
    if (!this.state.jwt) {
      return (
        <Auth />
      );
    } else if (this.state.jwt) {
      return (
        <LoggedIn />
      );
    }
  }
}