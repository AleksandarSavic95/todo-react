import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Header from './header';
import Footer from './footer';
import { PRIORITIES } from './constants';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  handleAddItem = (item) => {
    if (!item.text) return; // ignore empty strings
    const newItems = [
      ...this.state.items,
      {
        key: Date.now(),
        text: item.text,
        priority: item.priority,
        done: false
      }
    ]
    this.setState({
      items: newItems,
      text: "",
      priority: PRIORITIES.MEDIUM
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          onAddItem={this.handleAddItem}/>
        <View style={styles.content}>
          <Text />
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