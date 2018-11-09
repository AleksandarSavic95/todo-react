import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'

export default class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <TextInput
          value={this.props.value}
          onAddItem={this.handleAddItem}
          onChangeText={this.props.onChange}
          onSubmitEditing={this.props.onAddItem}
          placeholder="What do you need to do?"
          blurOnSubmit={false}
          returnKeyType="done"
          style={styles.input}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        height: 50
    },
    header: {
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",

    }
})