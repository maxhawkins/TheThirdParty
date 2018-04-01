// @flow

import type {Node} from 'react';
import type {StyleValue} from 'StyleSheetTypes';

import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View
} from 'react-native';

type Props = {|
  style: StyleValue,
  children: Node,
  onPress: () => void
|};

export default class Button extends Component<Props> {
  render() {
    return (<TouchableHighlight
                                {...this.props}
                                underlayColor="#E0E0E0"
                                style={ [styles.button, this.props.style] }>
              <Text style={ styles.buttonText }>
                { this.props.children }
              </Text>
            </TouchableHighlight>);
  }
}

const styles = StyleSheet.create({
  button: {
    height: 35,
    paddingLeft: 32,
    paddingRight: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 99,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFF'
  },
  buttonText: {
    fontFamily: 'Helvetica Neue',
    fontSize: 14,
    color: '#4D4D4D'
  }
});
