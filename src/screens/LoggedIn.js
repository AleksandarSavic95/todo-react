import React, { Component } from 'react'
import { StyleSheet, View, ListView, Keyboard } from 'react-native';

import { Button } from '../components/common/';

import TodoItemForm from '../components/TodoItemForm';
import Footer from '../components/Footer';

import Row from '../components/Row';
import { loadTodoItems, updateTodoItem } from '../services/apiService';

export default class LoggedIn extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      items: [],
      dataSource: ds.cloneWithRows([])
    }
    this.loadTodoItems = loadTodoItems.bind(this);
    this.loadTodoItems();
  }

  /**
   * Keep track of items rendered on the screen
   * @param {*} items 
   * @param {*} itemsDataSource 
   * @param {*} otherState 
   */
  setSource = (items, itemsDataSource, otherState = {}) => {
    this.setState({
      items,
      dataSource: this.state.dataSource.cloneWithRows(itemsDataSource),
      ... otherState
    })
  }

  handleToggleDone = (itemId, is_done) => {
    updateTodoItem({ id: itemId, is_done })
      .then((updatedItem) => {
        console.log("\nUPDATED ITEM:", updatedItem);
        if (!updatedItem) return;
    
        const newItems = this.state.items.map((item) => {
          if (item.id !== itemId) return item;
          return {
            ...item, is_done // is_done: true or false
          }
        })
        this.setSource(newItems, newItems);
      })
  }
  handleAddItem = (item) => {
    const newItems = [
      item, ...this.state.items // add new item, then the existing ones
    ]
    this.setSource(newItems, newItems);

  }

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.props.deleteJWT}>
          Log out
        </Button>
        <TodoItemForm onAddItem={this.handleAddItem}/>
        <View style={styles.content}>
          <ListView
            style={styles.list}
            enableEmptySections
            dataSource={this.state.dataSource}
            onScroll={() => Keyboard.dismiss()}
            renderRow={({id, ...value}) => {
              return (
                <Row
                  onDone={(is_done) => this.handleToggleDone(id, is_done)}
                  id={id}
                  {...value}
                />
              )
            }}
            renderSeparator={(sectionId, rowId) => {
              return <View key={rowId} style={styles.separator} />
            }}
          />
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
  },
  list: {
    backgroundColor: "white"
  },
  separator: {
    borderWidth: 1,
    borderColor: "#F5F5F5"
  }
})
