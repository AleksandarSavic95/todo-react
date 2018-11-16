import React, { Component } from 'react'
import { Text, View, Switch, StyleSheet } from 'react-native'
import { PRIORITIES } from '../../constants';

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
    const done = this.props.done;
    return (
      <View style={styles.container}>
        <Switch
          value={done}
          onValueChange={this.props.onDone}
        />
        <View styles={styles.textWrap}>
          <Text style={[styles.text, done && styles.done]}>{this.props.text}</Text>
        </View>
        <Text style={[styles.text, {backgroundColor: priorityColor[this.props.priority]}]}> ! </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flex: 1
  },
  textWrap: {
    flex: 1,
    marginHorizontal: 10
  },
  text: {
    fontSize: 24,
    color: "#4D4D4D",
  },
  done: {
    textDecorationLine: "line-through",
    backgroundColor: "lightgray"
  }
})
