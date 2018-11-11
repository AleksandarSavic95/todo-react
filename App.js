import React, {Component} from 'react';
import { StyleSheet, Text, View, ListView, Keyboard } from 'react-native';

import Header from './header';
import Footer from './footer';
import Row from './row';

import { PRIORITIES } from './constants';

// type Props = {};
export default class App extends Component { // <Props> {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      text: "",
      priority: PRIORITIES.MEDIUM,
      items: [],
      dataSource: ds.cloneWithRows([])
    }
    this.setSource = this.setSource.bind(this);
    this.handleToggleDone = this.handleToggleDone.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
  }

  /**
   * Keep track of items rendered on the screen
   * @param {*} items 
   * @param {*} itemsDataSource 
   * @param {*} otherState 
   */
  setSource(items, itemsDataSource, otherState = {}) {
    this.setState({
      items,
      dataSource: this.state.dataSource.cloneWithRows(itemsDataSource),
      ... otherState
    })
  }

  handleToggleDone(key, done) {
    const newItems = this.state.items.map((item) => {
      if (item.key !== key) return item;
      return {
        ...item,
        done // done: true or false
      }
    })
    this.setSource(newItems, newItems);
  }

  handleAddItem() {
    if (!this.state.text) return; // ignore empty strings
    const newItems = [
      ...this.state.items,
      {
        key: Date.now(),
        text: this.state.text,
        priority: this.state.priority,
        done: false
      }
    ]
    this.setSource(newItems, newItems, { text: "", priority: PRIORITIES.MEDIUM })
    /*
    this.setState({
      items: newItems,
      text: "",
      priority: PRIORITIES.MEDIUM
    }); */
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
          <ListView
            style={styles.list}
            enableEmptySections
            dataSource={this.state.dataSource}
            onScroll={() => Keyboard.dismiss()}
            renderRow={({key, ...value}) => {
              return (
                <Row
                  onDone={(done) => this.handleToggleDone(key, done)}
                  key={key}
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