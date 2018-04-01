// @flow

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

type Props = {|
  place: number
|}

export default class WaitListInfo extends React.Component<Props> {
  render() {
    const {place} = this.props;

    return (<View style={ styles.container }>
              <View style={ styles.header }>
                <Text style={ styles.title }>
                  WAIT LIST
                </Text>
              </View>
              <View style={ styles.main }>
                <Text style={ styles.body }>
                  We’ll be able to send you to random events soon! Until then, check out stories from other people’s events in the
                  <Text style={ styles.bold }>
                    { " stories " }
                  </Text>tab.
                </Text>
                <View style={ styles.placeBox }>
                  <Text style={ styles.place }>
                    { place }
                  </Text>
                  <Text style={ styles.placeSubtitle }>
                    people ahead of you
                  </Text>
                </View>
              </View>
            </View>);
  }
}

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: '#E13B16',
    height: 75,
    paddingTop: getStatusBarHeight(),
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  main: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 15,
    paddingBottom: 15,
    flex: 1
  },
  title: {
    letterSpacing: 1,
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white'
  },
  body: {
    fontFamily: 'Helvetica Neue',
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 20
  },
  placeBox: {
    width: "90%",
    aspectRatio: 1,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  place: {
    fontWeight: 'bold',
    fontSize: 64,
    textAlign: 'center'
  },
  placeSubtitle: {
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center'
  },
  bold: {
    fontWeight: 'bold'
  }
});
