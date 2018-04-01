// @flow

import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import ImageSourcePropType from 'ImageSourcePropType';

type Props = {|
  onPress: () => any,
  accessibilityLabel: string,
  image: ImageSourcePropType
|};

export default class ToolbarButton extends Component<Props> {
  render() {
    const {
      onPress,
      accessibilityLabel,
      image
    } = this.props;

    const hitSlop = {
      top: 20,
      left: 20,
      bottom: 20,
      right: 20
    };

    return (<TouchableOpacity
                              hitSlop={ hitSlop }
                              accessibilityLabel={ accessibilityLabel }
                              onPress={ onPress }>
              <Image source={ image } />
            </TouchableOpacity>);
  }
}
