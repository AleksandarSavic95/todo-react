import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Header from './header';
import Footer from './footer';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <Text>BUM!</Text>
        </View>
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 30
  },
  content: {
    flex: 1
  }
})