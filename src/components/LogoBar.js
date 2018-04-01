// @flow

import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

type Props = {|
  onProfile: () => void
|};

export default class LogoBar extends React.Component<Props> {
  render() {
    const {onProfile} = this.props;

    return (
      <View style={ styles.toolbar }>
        <View style={ { flex: 1 } }></View>
        <TouchableOpacity
                          activeOpacity={ 0.8 }
                          hitSlop={ {
                                      top: 20,
                                      left: 20,
                                      bottom: 20,
                                      right: 20
                                    } }
                          accessibilityLabel="Your Profile"
                          onPress={ () => onProfile() }>
          <Image
                 style={ styles.profile }
                 source={ require('../assets/profile.png') } />
        </TouchableOpacity>
        <View
              pointerEvents="none"
              style={ styles.center }>
          <Image
                 resizeMode="contain"
                 style={ styles.logo }
                 source={ require('../assets/logo.png') } />
        </View>
      </View>);
  }
  ;
}

const styles = StyleSheet.create({
  profile: {
    width: 30,
    height: 30
  },
  toolbar: {
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  center: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 40,
    height: 40
  }
});
