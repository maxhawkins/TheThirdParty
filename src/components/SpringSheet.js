// @flow

import type {Node} from 'react';

import React, { Component } from 'react';
import {
    Animated,
    View
} from 'react-native';

type Props = {|
  visible: boolean,
  height: number,
  children: Node
|};
type State = {|
  y: Animated.Value
|};

export default class SpringSheet extends Component<Props, State> {
  static defaultProps = {
    visible: false,
    height: 150
  }

  constructor(props: Props) {
    super(props);

    this.state = {
      y: new Animated.Value(props.visible ? 1 : 0)
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.visible) {
      Animated.sequence([
        Animated.delay(2000),
        Animated.spring(this.state.y, {
          toValue: 1
        })
      ]).start();

    } else {
      Animated.spring(this.state.y, {
        toValue: 0
      }).start();
    }
  }

  render() {
    const {y} = this.state;
    const {visible, height, children} = this.props;

    const bottom = y.interpolate({
      inputRange: [0, 1],
      outputRange: [-height, 0]
    });

    return (<Animated.View
                           pointerEvents={ visible ? 'auto' : 'none' }
                           style={ {
                                     position: 'absolute',
                                     left: 0,
                                     right: 0,
                                     bottom: bottom
                                   } }>
              { children }
            </Animated.View>);
  }
}
