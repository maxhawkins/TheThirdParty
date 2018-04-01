// @flow

import ImageSourcePropType from 'ImageSourcePropType';

import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';

type Props = {|
  onPress: () => any,
  label: string,
  image?: ImageSourcePropType
|};

export default class ActionSheetRow extends Component<Props> {
  render() {
    const {
      image,
      label,
      onPress
    } = this.props;

    return (<TouchableHighlight
                                accessibilityLabel={ label }
                                underlayColor="#EEE"
                                onPress={ () => onPress() }>
              <View style={ styles.row }>
                <Text style={ styles.text }>
                  { label }
                </Text>
                <Image source={ image } />
              </View>
            </TouchableHighlight>);
  }
}

const styles = StyleSheet.create({
  row: {
    height: 72,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    borderColor: '#ADADAD',
    borderBottomWidth: 1,
    flexDirection: 'row'
  },
  text: {
    fontSize: 18,
    fontFamily: 'Helvetica Neue',
    flex: 1
  }
});
