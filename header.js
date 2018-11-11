import React, { Component } from 'react'
import { Button, View, StyleSheet, TextInput, Picker } from 'react-native'
import { PRIORITIES } from './constants';

export default class Header extends Component {
  constructor(props) {
      super(props);
  }

  componentWillReceiveProps(nextProps) {
    console.log('received', nextProps.priority);
    console.log('received', nextProps);
  }

  render() {
    return (
        <View>
      <View style={styles.header}>
        <TextInput
          value={this.props.value}
          onChangeText={this.props.onTextChange}
          onSubmitEditing={this.props.onAddItem}
          placeholder="What do you need to do?"
          blurOnSubmit={false}
          returnKeyType="done"
          style={styles.input}/>
        <Picker
          selectedValue={this.props.priority}
          itemStyle={styles.pickerItem}
          style={styles.picker}
          onValueChange={this.props.onPriorityChange} >
          <Picker.Item label="Low" value={PRIORITIES.LOW} />
          <Picker.Item label="Medium" value={PRIORITIES.MEDIUM} />
          <Picker.Item label="High" value={PRIORITIES.HIGH} />
        </Picker>
      </View>
      <View>
        <Button
          onPress={this.props.onAddItem}
          title="Create"
          color="#009900"
        />
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        height: 50,
        fontSize: 20
    },
    picker: {
        width: 100,
        padding: 0
    },
    pickerItem: {
        /*fontSize: 10*/
    },
    header: {
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",

    }
})