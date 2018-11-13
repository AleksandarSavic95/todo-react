import React, { Component } from 'react'
import { TouchableOpacity, Text, View, StyleSheet, TextInput, Picker } from 'react-native'
import { PRIORITIES } from './constants';

export default class Header extends Component {
  constructor(props) {
      super(props);
      this.state = {
        text: "",
        priority: PRIORITIES.MEDIUM
      }
  }

  onTextChange = (text) => {console.log(text);this.setState({ text })}

  onPriorityChange = (value, index) => {console.log(value); this.setState({ priority: value })}

  render() {
    return (
      <View>
        <View style={styles.header}>
        <TextInput
          value={this.state.value}
          onChangeText={this.onTextChange}
          placeholder="What do you need to do?"
          blurOnSubmit={false}
          returnKeyType="done"
          style={styles.input} />
        <Picker
          selectedValue={this.state.priority}
          style={styles.picker}
          itemStyle={styles.pickerItem}
          onValueChange={this.onPriorityChange} >
          <Picker.Item label="Low" value={PRIORITIES.LOW} />
          <Picker.Item label="Medium" value={PRIORITIES.MEDIUM} />
          <Picker.Item label="High" value={PRIORITIES.HIGH} />
        </Picker>
        </View>
        <View>
          <TouchableOpacity onPress={() => {console.log(this.state);this.props.onAddItem(this.state)}}>
            <Text style={styles.createButton}>Create</Text>
          </TouchableOpacity>
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
    },
    createButton: {
        backgroundColor: 'blue',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 12,
        marginHorizontal: 20,
        textAlign:'center'
    },
    header: {
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    }
})