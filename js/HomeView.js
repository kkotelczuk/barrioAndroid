import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, AsyncStorage, Image, Dimensions, KeyboardAvoidingView, FlatList, TouchableHighlight } from 'react-native';
import { observer, inject } from "mobx-react/native";


@inject("store")
@observer
class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: []
    }
  }
  componentDidMount() {
    this.props.store.chatStore.fetch(this.props.store.userStore.token)
  }

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
        onPress={() => {
          this.props.store.chatStore.fetchMessages(
            item.id,
            this.props.store.userStore.token,
          )
          this.props.store.chatStore.selectChat(parseInt(item.id))
          this.props.navigation.navigate('ChatView',{chatiD: item.id})
        }}
        underlayColor={'rgba(140,140,140,0.1)'}
      >
        <Text style={styles.listElement}>
          {item.name}
        </Text>
      </TouchableHighlight>
    )
  }

  render() {
    const { navigate } = this.props.navigation;
    const listData = this.props.store.chatStore.items;

    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{flex: 1}}
          data={listData}
          renderItem={(item) => this.renderItem(item)}
          ListHeaderComponent={<Text style={styles.listHeader}>MY SAVED CHAT LIST</Text>}
          ListFooterComponent={false && <Button title="Show More" onPress={() => console.log('navigate to another view')} />}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    flexGrow: 1
  },
  listHeader: {
    marginLeft: 8,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#CED0CE',
    fontWeight: '500',
    fontSize: 14,
    fontVariant: ['small-caps']
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

export default HomeView
