import React from 'react';
import { View, Text, TextInput, Button, AsyncStorage } from 'react-native';
import auth from './api/auth';

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
      <View>
        <Text>Login to application or create account</Text>
        <TextInput
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          placeholder="Email address"
        />
        <TextInput
          onChangeText={(text) => this.setState({password: text})}
          value={this.state.password}
          secureTextEntry={true}
          placeholder="Password"
        />
        <Button
          onPress={() => auth.login(this.state.text, this.state.password)}
          title="Login"
          color="#841584"
        />
      </View>
    )

  }
}

export default LoginView
