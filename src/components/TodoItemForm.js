import React, { Component } from 'react'
import { TouchableOpacity, Text, View, StyleSheet, TextInput, Picker } from 'react-native'
import { PRIORITIES } from '../../constants';

import axios from 'axios';
import deviceStorage from '../services/deviceStorage';
import { postAuthenticated } from '../services/apiService';

export default class Header extends Component {
  constructor(props) {
      super(props);
      this.state = {
        title: "",
        content: "",
        priority: PRIORITIES.MEDIUM
      }
  }

  onTitleChange = (title) => {console.log(title);this.setState({ title })}

  onChangeContent = (content) => {console.log(content);this.setState({ content })}

  onPriorityChange = (value, index) => {console.log(value); this.setState({ priority: value })}

  addItem = () => {
    const { title, content, priority } = this.state;
    console.log("\nCREATING:", title, content, priority);

    // this.setState({ error: '', loading: true }); // TODO: add error and here?

    postAuthenticated("http://app-backend.test/api/todoitems", {
      title,
      content,
      priority
    }, (createdItem) => {
      console.log('\nCREATED ITEM ', createdItem, '\n');
      if (!createdItem) return;
      this.props.onAddItem(createdItem);
      this.setState({ title: "", content: "", priority: PRIORITIES.MEDIUM }); // error: '', loading: false
    });
  }

  render() {
    return (
      <View>
        <View style={styles.titleInputWrap}>
          <TextInput
            value={this.state.title}
            onChangeText={this.onTitleChange}
            placeholder="What do you need to do?"
            blurOnSubmit={false}
            returnKeyType="done"
            style={styles.titleInput} />
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
        <View style={styles.contentInputWrap}>
          <TextInput
            value={this.state.content}
            onChangeText={this.onChangeContent}
            placeholder="Describe Your task"
            blurOnSubmit={false}
            returnKeyType="done"
            multiline={true}
            numberOfLines={3}
            style={styles.contentInput} />
        </View>
        <View>
          <TouchableOpacity onPress={this.addItem}>
            <Text style={styles.createButton}>Create</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    titleInput: {
      flex: 1,
      height: 50,
      fontSize: 20
    },
    contentInput: {
      flex: 1,
      fontSize: 20,
      height: 80
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
    titleInputWrap: {
      paddingHorizontal: 20,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center"
    },
    contentInputWrap: {
      paddingHorizontal: 20,
      marginTop: -40,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center"
    }
})