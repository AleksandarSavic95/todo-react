import React, { Component } from 'react'
import { TouchableOpacity, Text, View, StyleSheet, TextInput, Picker } from 'react-native'
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
          style={styles.input} />
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
          <TouchableOpacity onPress={this.props.onAddItem}>
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
        /*fontSize: 10*/
    },
    createButton: {
        /*
        color: "#009900",
        backgroundColor: "gray" */
        backgroundColor: 'blue',
        // borderRadius: 12,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 12,
        marginHorizontal: 20,
        textAlign:'center'
    },
    header: { // https://facebook.github.io/react-native/docs/flexbox
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center", // !
    }
})