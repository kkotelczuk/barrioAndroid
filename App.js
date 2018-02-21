import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

import LoginView from './js/LoginView';

class HomeScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Barrio App</Text>
        <Button
          title="Go to LoginView"
          onPress={() =>
            navigate('LoginView', { name: 'Jane' })
          }
        />
      </View>
    );
  }
}

export default StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  LoginView: {screen: LoginView}
});