// @flow

import type {Node} from 'react';
import type {StyleValue} from 'StyleSheetTypes';

import React, { Component } from 'react';
import {
    Animated,
    Easing,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import Fader from './Fader';

type Props = {|
  children: Node,
  onClose: () => any,
  style: StyleValue,
  visible: boolean,
  accessibilityLabel?: string
|};

export default class Dialog extends Component<Props> {

  render() {
    const {
      children,
      onClose,
      style,
      visible
    } = this.props;

    return (
      <View
            pointerEvents={ visible ? 'auto' : 'none' }
            style={ styles.frame }>
        <Fader
               visible={ visible }
               pointerEvents={ visible ? 'auto' : 'none' }
               style={ styles.container }>
          <TouchableWithoutFeedback onPress={ onClose }>
            <View style={ styles.blocker }></View>
          </TouchableWithoutFeedback>
          <View style={ style }>
            { children }
          </View>
        </Fader>
      </View>);
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  frame: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  blocker: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
});
