import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import startTabs from '../MainTabs/startMainTabs';


export class Auth extends Component {
  loginHandler = () => {
    startTabs();
  }

  render() {
    return (
      <View>
        <Text> textInComponent </Text>
        <Button title="Login" onPress={this.loginHandler} />
      </View>
    );
  }
}

export default Auth;
