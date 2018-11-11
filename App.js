import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Header from './header';
import Footer from './footer';
import { PRIORITIES } from './constants';

// type Props = {};
export default class App extends Component { // <Props> {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      priority: PRIORITIES.MEDIUM,
      items: []
    }
    this.handleAddItem = this.handleAddItem.bind(this);
  }

  handleAddItem() {
    if (!this.state.text) return; // ignore empty strings
    const newItems = [
      ...this.state.items,
      {
        key: Date.now(),
        text: this.state.text,
        priority: this.state.priority,
        complete: false
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
          value={this.state.text}
          priority={this.state.priority}
          onAddItem={this.handleAddItem}
          onTextChange={(text) => { console.log(text); this.setState({ text });}}
          onPriorityChange={(value, index) => {
            console.log(value);
            this.setState({ priority: value }, () => { console.log(this.state.priority) });
          }}/>
        <View style={styles.content}>
          <Text></Text>
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