import React, { Component } from 'react';
import { Loading } from './components/common/';
import { Registration, Login } from './components';
import LoggedIn from './screens/LoggedIn';

import deviceStorage from './services/deviceStorage';

import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage and navigate to corresponding screen
  _bootstrapAsync = async () => {
    const token = await deviceStorage.getJWT();
    this.props.navigation.navigate(token ? 'App' : 'Auth');
  };

  render() {
    return (
      <Loading size={'large'} />
    );
  }
}

/**
 *  N A V I G A T I O N   C O N F I G
 */
const AppStack = createStackNavigator(
  {
    Home: LoggedIn,
    // TodoItemDetails: TodoItemDetails // TODO :)
  },
  {
    initialRouteName: 'Home'
  });
const AuthStack = createStackNavigator({ Login: Login, Registration: Registration });

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);