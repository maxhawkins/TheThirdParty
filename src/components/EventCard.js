// @flow

import type {Event} from '../API';

import Dimensions from 'Dimensions';

import TouchableShadow from './TouchableShadow';
import FadeView from './FadeView';
import moment from 'moment';
import React, { Component } from 'react'
import {
    Animated,
    AppRegistry,
    Image,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import FastImage from 'react-native-fast-image';

var device = Dimensions.get('window');

export function formattedDay(dayStr: string, nowStr: ?string, utcOffset: ?number) {
  const date = moment(dayStr).local();
  const now = moment(nowStr).local();

  const yesterday = moment(now).add(-1, 'day').startOf('day');
  const tomorrow = moment(now).add(1, 'day').startOf('day');

  if (date.isBefore(yesterday)) {
    return date.format('MM/DD');

  } else if (date.isBefore(yesterday.endOf('day'))) {
    return 'yesterday';

  } else if (date.isBefore(tomorrow)) {
    if (date.hour() > 17) {
      return 'tonight';
    } else {
      return 'today';
    }

  } else if (date.isBefore(tomorrow.endOf('day'))) {
    return 'tomorrow';

  } else {
    return date.format('MM/DD');
  }
}

function formattedTime(d) {
  return moment(d).format('h:mm A');
}

type Props = {|
  event: ?Event,
  loading: boolean,
  onPress: () => any
|};
type State = {|
  imageLoaded: boolean
|};

export default class EventCard extends Component<Props, State> {

  state = {
    imageLoaded: false
  }

  render() {
    var {
      event,
      loading,
      onPress
    } = this.props;

    return (<TouchableShadow onPress={ () => onPress() }>
              <View style={ styles.card }>
                <View style={ styles.imageBox }>
                  <FadeView
                            style={ styles.imageFade }
                            visible={ this.state.imageLoaded && !loading }>
                    <FastImage
                               accessibilityLabel="Cover Image"
                               resizeMode="cover"
                               onLoad={ () => this.setState({ imageLoaded: true }) }
                               style={ styles.image }
                               source={ event
                                        ? {
                                          uri: event.cover,
                                          priority: FastImage.priority.high
                                        }
                                        : null } />
                  </FadeView>
                </View>
                <FadeView
                          visible={ !loading }
                          style={ styles.description }>
                  <Text
                        style={ styles.title }
                        ellipsizeMode="tail"
                        numberOfLines={ 2 }>
                    { event ? event.name : null }
                  </Text>
                  <View style={ styles.bottom }>
                    <View style={ styles.dayTime }>
                      <Text style={ styles.day }>
                        { event ? formattedDay(event.start_time).toUpperCase() : null }
                      </Text>
                      <Text style={ styles.daySep }>
                        { "|" }
                      </Text>
                      <Text style={ styles.time }>
                        { event ? formattedTime(event.start_time) : null }
                      </Text>
                    </View>
                    <Image
                           style={ styles.infoIcon }
                           source={ require('../assets/info-icon.png') } />
                  </View>
                </FadeView>
              </View>
            </TouchableShadow>);
  }

}

const styles = StyleSheet.create({
  image: {
    flex: 1
  },
  imageFade: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden'
  },
  imageBox: {
    flex: 1,
    backgroundColor: '#808080',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  },
  when: {
    fontSize: 14,
    color: '#404040',
    flex: 1
  },
  where: {
    fontSize: 14,
    color: '#404040'
  },
  top: {
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  card: {
    height: 35 * 8,
    flex: 1
  },
  title: {
    color: '#000',
    lineHeight: 24,
    marginBottom: 9,
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    fontSize: 18
  },
  subtitle: {
    color: '#4A4A4A',
    fontSize: 14
  },
  description: {
    padding: 16,
    justifyContent: 'center'
  },
  day: {
    fontSize: 14,
    fontWeight: '500',
    color: '#E13B16',
    fontFamily: 'Helvetica Neue'
  },
  daySep: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '500',
    marginLeft: 5,
    marginRight: 5,
    color: "#D9D9D9"
  },
  time: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '500'
  },
  dayTime: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingTop: 3
  },
  bottom: {
    flexDirection: 'row'
  },
  infoIcon: {
    alignSelf: 'flex-end'
  }
});
