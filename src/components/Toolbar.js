// @flow

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

type Props = {|
  header?: string,
  left?: any,
  right?: any,
  transparent?: boolean
|}

export default class Toolbar extends React.Component<Props> {
  render() {
    const {
      header,
      left,
      right,
      transparent
    } = this.props;

    return (<View style={ [styles.toolbar, transparent ? styles.toolbarTransparent : null] }>
              <View style={ styles.left }>
                { left }
              </View>
              <View style={ styles.center }>
                <Text style={ styles.header }>
                  { header }
                </Text>
              </View>
              <View style={ styles.right }>
                { right }
              </View>
            </View>);
  }
}

const styles = StyleSheet.create({
  toolbar: {
    height: getStatusBarHeight() + 50,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: getStatusBarHeight(),
    flexDirection: 'row',

    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 10,

    shadowColor: '#000',
    shadowRadius: 10,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },

    backgroundColor: 'white'
  },
  toolbarTransparent: {
    backgroundColor: 'transparent',
    shadowOpacity: 0
  },
  left: {
    justifyContent: 'center',
    width: 80
  },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: 80
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    fontFamily: 'Helvetica Neue',
    fontSize: 18,
    fontWeight: '600',
    color: '#333'
  }
});
