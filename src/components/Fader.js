// @flow

import type {Node} from 'react';
import type {StyleValue} from 'StyleSheetTypes';
import type {ViewProps} from 'ViewPropTypes';

import React, { Component } from 'react';
import {
    Animated,
    Easing,
    Image,
    TouchableWithoutFeedback,
    View
} from 'react-native';

type Props = {
  ...ViewProps,
  visible: boolean,
  children: Node
};

type State = {|
  opacity: Animated.Value
|};

export default class Fader extends Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      opacity: new Animated.Value(props.visible ? 1 : 0)
    };
  }

  componentWillReceiveProps({visible}:Props) {
    Animated.timing(this.state.opacity, {
      toValue: visible ? 1 : 0,
      duration: 400
    }).start();
  }

  render() {
    const {opacity} = this.state;
    return (<Animated.View
                           {...this.props}
                           style={ [this.props.style, { opacity }] }>
              { this.props.children }
            </Animated.View>)
  }
}
