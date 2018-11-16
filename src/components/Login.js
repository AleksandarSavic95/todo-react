import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Input, TextLink, Loading, Button } from './common';

import { login } from '../services/apiService';
import deviceStorage from '../services/deviceStorage';
import { JWT_STORAGE_KEY } from '../constants';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false
    };
  }

  loginUser = () => {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    login({ email, password })
    .then((response) => {
      if (!response) return; // request error happened
      if (!response.access_token) {  // data error happened
        // only "error" and "loading" are returned
        this.setState(response);
      }
      else {
        deviceStorage.saveItem(JWT_STORAGE_KEY, response.access_token);
        this.props.navigation.navigate('App');
      }
    });
  }

  render() {
    const { email, password, error, loading } = this.state;
    const { form, section, errorTextStyle } = styles;

    return (
      <View style={styles.container}>
        <View style={form}>
          <View style={section}>
            <Input
              placeholder="user@email.com"
              label="Email"
              value={email}
              onChangeText={email => this.setState({ email })}
              autoCapitalize={"none"}
            />
          </View>

          <View style={section}>
            <Input
              secureTextEntry
              placeholder="password"
              label="Password"
              value={password}
              onChangeText={password => this.setState({ password })}
            />
          </View>

          <Text style={errorTextStyle}>
            {error}
          </Text>

          {
            !loading ?
            <Button onPress={this.loginUser}>
              Login
            </Button>
            :
            <Loading size={'large'} />
          }
        </View>
        <TextLink onPress={() => this.props.navigation.navigate('Registration')}>
          Don't have an account? Register!
        </TextLink>
      </View>
    );
  }
}

const styles = {
  form: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  section: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ddd',
  },
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center'
  }
};

export { Login };