import React, { Component  } from 'react';
import { View, Text } from 'react-native';
import { Input, TextLink, Button, Loading } from './common';

import { register } from '../services/apiService';
import deviceStorage from '../services/deviceStorage';
import { JWT_STORAGE_KEY } from '../constants';


class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      error: '',
      loading: false
    };
  }

  registerUser = () => {
    const { name, email, password, password_confirmation } = this.state;

    this.setState({ error: '', loading: true });

    register({ name, email, password, password_confirmation})
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
    const { name, email, password, password_confirmation, error, loading } = this.state;
    const { form, section, errorTextStyle } = styles;

    return (
      <View style={styles.container}>
        <View style={form}>
          <View style={section}>
            <Input
              placeholder="Name"
              label="Name"
              value={name}
              onChangeText={name => this.setState({ name })}
            />
          </View>

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

          <View style={section}>
            <Input
              secureTextEntry
              placeholder="confirm password"
              label="Confirm Password"
              value={password_confirmation}
              onChangeText={password_confirmation => this.setState({ password_confirmation })}
            />
          </View>

          <Text style={errorTextStyle}>
            {error}
          </Text>

          { // ternary expression - todo: replace with regular (?)
            !loading ? (
              <Button onPress={this.registerUser}>
                Register
              </Button>
            ) : (
              <Loading size={'large'} />
            )
          }

        </View>
        <TextLink onPress={() => this.props.navigation.navigate('Login')}>
          Already have an account? Log in!
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

export { Registration };