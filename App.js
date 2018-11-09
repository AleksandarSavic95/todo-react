import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Header from './header';
import Footer from './footer';

// type Props = {};
export default class App extends Component { // <Props> {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      items: []
    }
    this.handleAddItem = this.handleAddItem.bind(this);
  }

  handleAddItem() {
    if (!this.state.value) return; // ignore empty strings
    const newItems = [
      ...this.state.items,
      {
        key: Date.now(),
        text: this.state.value,
        complete: false
      }
    ]
    this.setState({
      items: newItems,
      value: ""
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          value={this.state.value}
          onAddItem={this.handleAddItem}
          onChange={(value) => this.setState({ value })}/>
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