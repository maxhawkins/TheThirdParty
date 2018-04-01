// @flow

import Loader from '../components/Loader';
import React, { Component } from 'react';
import {
    AppRegistry,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export class LoadingPage extends Component< {}> {

  render() {
    return (
      <View style={ styles.container }>
        <Loader />
        <Text style={ styles.text }>
          Loading…
        </Text>
      </View>);
  }
}
export default LoadingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA'
  },
  loader: {
    width: 100,
    height: 100
  },
  text: {
    color: '#BBB'
  }
});
