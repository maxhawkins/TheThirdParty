// @flow

import LottieView from 'lottie-react-native';
import type {StyleValue} from 'StyleSheetTypes';
import React, { Component } from 'react';
import {
    Animated,
    Image,
    View
} from 'react-native';

type Props = {|
  style?: StyleValue
|};
type State = {|
  progress: Animated.Value
|};

export default class Loader extends React.Component<Props, State> {

  animation: LottieView;

  constructor(props: Props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0)
    };
  }

  componentDidMount() {
    this.animation.play();
  }

  render() {
    const {style} = this.props;

    return (
      <View style={ style }>
        <LottieView
                    ref={ animation => this.animation = animation }
                    loop={ true }
                    style={ { width: 300, height: 300 } }
                    source={ require('./simple_loader.json') } />
      </View>);
  }
}
