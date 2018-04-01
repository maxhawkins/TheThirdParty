// @flow

import type {Node} from 'react';

import React, { Component } from 'react';
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
  onPress: () => void,
  children: Node
|};
type State = {|
  lerp: Animated.Value
|};

export default class TouchableShadow extends Component<Props, State> {
  state = {
    lerp: new Animated.Value(0)
  }

  setPressed(pressed: boolean) {
    Animated.timing(this.state.lerp, {
      toValue: pressed ? 1 : 0,
      duration: 200
    }).start();
  }

  render() {
    const {lerp} = this.state;
    const {
      onPress,
      children
    } = this.props;

    const shadowOpacity = Animated.add(Animated.multiply(lerp, 0.1), 0.2);
    const shadowRadius = Animated.add(Animated.multiply(lerp, 5), 10);

    return (<Animated.View style={ [
                         styles.touchableShadow,
                         { shadowOpacity, shadowRadius }
                       ] }>
              <TouchableWithoutFeedback
                                        onPressIn={ () => this.setPressed(true) }
                                        onPressOut={ () => this.setPressed(false) }
                                        onPress={ () => onPress() }>
                <View>
                  { children }
                </View>
              </TouchableWithoutFeedback>
            </Animated.View>);
  }
}

const styles = StyleSheet.create({
  touchableShadow: {
    shadowRadius: 10,
    shadowOpacity: 0.1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 16
  }
});
