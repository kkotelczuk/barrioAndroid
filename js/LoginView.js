import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, AsyncStorage, Image, Dimensions, KeyboardAvoidingView } from 'react-native';
import auth from './api/auth';
import { observer, inject } from "mobx-react/native";

@inject("store")
@observer
class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      password: ''
    };
  }

  render() {
    return (
      <KeyboardAvoidingView keyboardVerticalOffset={-300} style={styles.container} behavior="padding">
        <View style={styles.imageContainer}>
          <Image
            style={styles.backgroundImge}
            source={require('../assets/Neighbours.png')}
          />
          <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 40}}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.logo}
            />
          </View>
          <Text style={styles.title}>Barrio</Text>
          <Text style={styles.subtitle}>Broadcast to your neighbours</Text>
        </View>
        <View style={{flex:1}}>
          <TextInput
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            placeholder="Email address"
            style={styles.input}
            underlineColorAndroid="transparent"
          />
          <TextInput
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
            placeholder="Password"
            style={styles.input}
            underlineColorAndroid="transparent"
          />
          <View style={styles.button}>
            <Button
              onPress={() => this.props.store.userStore.login({
                username: this.state.text,
                password: this.state.password
              }).then( () => this.props.navigation.navigate('HomeView'))}
              title="Login"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    )

  }
}
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height * 0.3;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    flexGrow: 1
  },
  backgroundImge: {
    height: screenHeight,
    width: screenWidth,
    resizeMode: 'stretch',
    overflow: 'visible'
  },
  imageContainer: {
    marginTop: 16,
    marginBottom: 16,
    flex: 1,
    flexGrow: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: 36,
    color: '#000',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 21,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#eee',
    marginVertical: 4,
    marginHorizontal: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    height: 50
  },
  button: {
    marginHorizontal: 8,
    marginVertical: 8
  }
});

export default LoginView
