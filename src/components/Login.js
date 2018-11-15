import React, { Component, Fragment } from 'react';
import { Text, View } from 'react-native';
import { Input, TextLink, Loading, Button } from './common';

import axios from 'axios';
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

    axios.post("http://app-backend.test/api/auth/login", {
      email,
      password
    })
    .then((response) => {
      const { access_token } = response.data;
      let dataErrorMessage = '';

      if (!access_token) {
        const errorsByField = response.data;

        for (fieldName in errorsByField) {
          dataErrorMessage += errorsByField[fieldName].join(' ') + '\n';
        }
        // strip last '\n'
        this.setState({ error: dataErrorMessage.slice(0, -1), loading: false });
      }
      else {
        deviceStorage.saveItem(JWT_STORAGE_KEY, access_token);
        this.props.setJWT(access_token);
      }
    })
    .catch((error) => {
      console.log(error);
      // deep destructuring - error.response.status  and  error.response.data.exception
      const { response: { status }, response: { data: { exception } } } = error;
      let requestErrorMessage = `Error ${status} - ${exception}`;
      // if it's not an exception, then it is "Unauthorized" or a similar message
      if (!exception) {
        requestErrorMessage = `Error ${status} - ${error.response.data.error}`;
      }
      this.setState({ error: requestErrorMessage, loading: false });
    });
  }

  render() {
    const { email, password, error, loading } = this.state;
    const { form, section, errorTextStyle } = styles;

    return (
      <Fragment>
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
        <TextLink onPress={this.props.toggleAuthForm}>
          Don't have an account? Register!
        </TextLink>
      </Fragment>
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
  }
};

export { Login };