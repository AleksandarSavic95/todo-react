import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, Picker } from 'react-native'
import { PRIORITIES } from '../../constants';

import { Loading, Button } from '../components/common';

import { postAuthenticated } from '../services/apiService';

export default class TodoItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      priority: PRIORITIES.MEDIUM,
      error: "",
      loading: false
    }
  }

  onTitleChange = (title) => { this.setState({ title })}

  onChangeContent = (content) => { this.setState({ content })}

  onPriorityChange = (value, index) => { this.setState({ priority: value })}

  addItem = () => {
    const { title, content, priority } = this.state;
    if (!title || !content) {
      this.setState({ error: "Title and content are required fields!"})
      return;
    }

    this.setState({ error: "", loading: true });

    postAuthenticated("http://app-backend.test/api/todoitems", {
      title,
      content,
      priority
    }, (response) => {
      if (!response) return;
      if (!response.title) {
        this.setState(response); // if there are errors, only "error" and "loading" are returned
      }
      else {
        this.props.onAddItem(response);
        this.setState({ title: "", content: "", priority: PRIORITIES.MEDIUM, error: "", loading: false });
      }
    });
  }

  render() {
    const { error, loading } = this.state;
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
          <Text style={styles.errorTextStyle}>
            {error}
          </Text>
          {
            !loading ?
            <Button onPress={this.addItem} styleProp={styles.createButton}>
              Create
            </Button>
            :
            <Loading size={'large'} />
          }
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
      flex: 1,
      backgroundColor: 'green',
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
    },
    errorTextStyle: {
      alignSelf: 'center',
      fontSize: 18,
      color: 'red'
    }
})