import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { PRIORITIES } from './constants';

const priorityColor = {
    [PRIORITIES.LOW]: 'green',
    [PRIORITIES.MEDIUM]: 'lightskyblue',
    [PRIORITIES.HIGH]: 'red'
}

export default class Row extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={{marginRight: 10}}>{this.props.text}</Text>
        <Text style={{backgroundColor: priorityColor[this.props.priority]}}> ! </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between"
  },
  text: {
    fontSize: 24,
    color: "#4D4D4D",
  }
})
