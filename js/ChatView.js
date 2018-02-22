import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, AsyncStorage, Image, Dimensions, KeyboardAvoidingView, FlatList, TouchableHighlight } from 'react-native';
import { observer, inject } from "mobx-react/native";


@inject("store")
@observer
class ChatView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: []
    }
  }

  // componentDidMount(){
  //   this.setState({
  //     chats: this.props.store.chatStore.chat()
  //   })
  // }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: "#CED0CE",
          marginLeft: 8
        }}
      />
    );
  };

  renderItem = ({item}) => {
    return (
      <TouchableHighlight
        style={styles.touchableElement}

        underlayColor={'rgba(140,140,140,0.1)'}
      >
        <Text style={styles.listElement}>
          {item.content}
        </Text>
      </TouchableHighlight>
    )
  }

  renderHeader = () => {
    return (
        <View style={styles.header}>
          <TouchableHighlight
            style={styles.backIcon}
            onPress={() => this.props.navigation.goBack(null)}
            underlayColor={'rgba(140,140,140,0.1)'}
          >
            <Text style={styles.headerIcon}>
            {`<-`}
            </Text>
          </TouchableHighlight>
          <Text style={styles.headerText}>{this.props.store.chatStore.chat.name}</Text>
        </View>
      );
  }

  render() {
    const { navigate } = this.props.navigation;
    const listData = this.props.store.chatStore.items;

    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <FlatList
          inverted={true}
          keyExtractor={(item, index) => index}
          style={{ flexGrow: 1, flexBasis: 0 }}
          data={this.props.store.chatStore.chat.messages}
          renderItem={(item) => this.renderItem(item)}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flexGrow: 1
  },
  header: {
    backgroundColor: '#ffe0b2',
    paddingVertical: 16,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  backIcon: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    flex: 0,
    width: 40
  },
  headerText: {
    textAlign: 'center',
    flex: 1,
    marginLeft: -24,
    color: '#9f622d'
  },
  headerIcon: {
    fontSize: 20,
    color: '#9f622d'
  },
  listElement: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  touchableElement: {
    marginLeft: 8,
    paddingVertical: 16
  }
});

export default ChatView
