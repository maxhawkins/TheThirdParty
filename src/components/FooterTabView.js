// @flow

import type ImageSourcePropType from 'ImageSourcePropType';
import type {StyleObj} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import isiPhoneX from '../isiPhoneX';

type Props = {|
  label: string,
  onPress: () => void,
  icon: ImageSourcePropType,
  style?: StyleObj
|};

export default class FooterTabView extends React.Component<Props> {
  render() {
    const {
      icon,
      label,
      onPress,
      style
    } = this.props;

    return (<TouchableHighlight
                                underlayColor="#EEE"
                                onPress={ onPress }
                                style={ [styles.tab, style] }>
              <View style={ styles.tab }>
                <View style={ styles.tabInner }>
                  <View style={ styles.iconContainer }>
                    <Image
                           resizeMode="contain"
                           style={ styles.icon }
                           source={ icon } />
                  </View>
                  <Text style={ styles.label }>
                    { label }
                  </Text>
                </View>
              </View>
            </TouchableHighlight>);
  }
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    borderRightColor: '#F2F2F2',
    borderRightWidth: 1
  },
  tabInner: {
    height: 56
  },
  label: {
    fontFamily: 'Helvetica Neue',
    color: '#404040',
    fontSize: 10,
    textAlign: 'center',
    marginBottom: 4
  },
  icon: {
    flex: 1
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
