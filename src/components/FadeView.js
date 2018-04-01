// @flow

import type {Node} from 'react';
import type {StyleValue} from 'StyleSheetTypes';

import React, { Component, Children } from 'react'
import {
    Animated,
    AppRegistry,
    Image,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View
} from 'react-native';

type Props = {|
  duration: number,
  children: Node,
  style: StyleValue,
  visible: boolean
|};
type State = {|
  opacity: Animated.Value
|};

export default class FadeView extends Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      opacity: new Animated.Value(props.visible ? 1 : 0)
    };
  }

  static defaultProps = {
    duration: 400
  }

  componentWillUpdate(newProps: Props) {
    Animated.timing(this.state.opacity, {
      toValue: newProps.visible ? 1 : 0,
      duration: newProps.duration
    }).start();
  }

  render() {
    const {opacity} = this.state;
    return (<Animated.View
                           {...this.props}
                           style={ [this.props.style, { opacity: opacity }] }>
              { this.props.children }
            </Animated.View>);
  }
}
