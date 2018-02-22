import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider } from "mobx-react/native";
import {Store} from "./store";

import LoginView from './js/LoginView';
import HomeView from './js/HomeView';
import ChatView from './js/ChatView';


const App = StackNavigator(
	{
    HomeView: {screen: HomeView},
    LoginView: {screen: LoginView},
    ChatView: {screen: ChatView}
	},
	{
		initialRouteName: "LoginView",
		headerMode: "none",
	}
);

export default () => (
  <Provider store={Store.create()}>
    <App />
  </Provider>
);
