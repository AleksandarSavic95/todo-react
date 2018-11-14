import React, { Component, Fragment } from 'react';
import { View, Text } from 'react-native';
import { Input, TextLink, Button, Loading } from './common';
import axios from 'axios';


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
    console.log('------STATE----\n', this.state);

    const { name, email, password, password_confirmation } = this.state;

    this.setState({ error: '', loading: true });

    axios.post("http://app-backend.test/api/auth/register", {
      name,
      email,
      password,
      password_confirmation
    })
    .then((response) => {
      if (!response.data.access_token) {
        const errorsByField = response.data;
        
        let errorMessage = '';
        for (fieldName in errorsByField) {
          errorMessage += errorsByField[fieldName].join(' ') + '\n';
        }
        // strip last '\n'
        this.setState({ error: errorMessage.slice(0, -1), loading: false });
      }
      // TODO: Handle the JWT { access_token, token_type, expires_in }
    })
    .catch((error) => {
      console.log('request error', error);
      this.setState({ error });
    });

  }

  render() {
    const { name, email, password, password_confirmation, error, loading } = this.state;
    const { form, section, errorTextStyle } = styles;

    return (
      <Fragment>
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
            !loading ?
              <Button onPress={this.registerUser}>
                Register
              </Button>
            :
              <Loading size={'large'} />
          }

        </View>
        <TextLink onPress={this.props.toggleAuthForm}>
          Already have an account? Log in!
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

export { Registration };