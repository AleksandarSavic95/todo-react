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
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    })
    .then((response) => {
      console.log('\nresponse data:', response.data);
      if (!response.data.access_token) {
        console.log('errors!');
        const errorsByField = response.data;
        
        let errorMessage = '';
        for (fieldName in errorsByField) {
          console.log(fieldName);
          // errorMessage += fieldName + ': ';
          console.log(errorsByField[fieldName]);

          errorsByField[fieldName].forEach(fieldError => {
            errorMessage += fieldError + ' ';
            console.log('fieldError:', fieldError);
          });
          errorMessage += '\n';
        }
        console.log('\n=== FINAL ERROR MESSAGE ===', errorMessage);
        this.setState({ error: errorMessage.slice(0, -1), loading: false }); // strip last '\n'
      }
      // Handle the JWT response here
      /**
      * {
          "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcHAtYmFja2VuZC50ZXN0XC9hcGlcL2F1dGhcL3JlZ2lzdGVyIiwiaWF0IjoxNTQyMjAzNzI1LCJleHAiOjE1NDIyNjEzMjUsIm5iZiI6MTU0MjIwMzcyNSwianRpIjoiWDdhamg3QnNXYnFUdjQ3YyIsInN1YiI6MTIsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.t3Auu3iZ8DIW4WknFS24Cjh4LdYdeQrnva1-97lWdUY",
          "token_type": "bearer",
          "expires_in": 57600
        }
      */
    })
    .catch((error) => {
      console.log(error);
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