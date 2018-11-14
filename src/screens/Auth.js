import React, { Component } from 'react';
import { View } from 'react-native';
import { Login, Registration } from '../components';

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: false
    };
  }

  toggleAuthForm = () => {
    this.setState({
      showLogin: !this.state.showLogin
    });
  }

  whichForm = () => {
    if (!this.state.showLogin){
      return(
        <Registration toggleAuthForm={this.toggleAuthForm}/>
      );
    } else {
      return(
        <Login toggleAuthForm={this.toggleAuthForm}/>
      );
    }
  }

  render() {
    return(
      <View style={styles.container}>
        {this.whichForm()}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center'
  }
};