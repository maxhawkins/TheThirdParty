// @flow

import type {Event} from '../API';
import type {Location} from '../Geolocation';

import Button from '../components/Button';
import FadeView from '../components/FadeView';
import geolib from 'geolib';
import React, { Component } from 'react';
import {
    ActivityIndicator,
    AppRegistry,
    FlatList,
    Image,
    Platform,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import MapView from 'react-native-maps';

function formatUnit(unit, singular) {
  switch (unit) {
    case 'mi':
      return singular ? 'mile' : 'miles';
    default:
      return '';
  }
}

function formatDistance(src, dest, unit = 'mi') {
  const distM = geolib.getDistance(src, dest);
  const dist = geolib.convertUnit(unit, distM);

  var distStr;
  if (dist < 10) {
    distStr = dist.toPrecision(1).toString();
  } else {
    distStr = Math.floor(dist / 10) * 10;
  }

  const unitStr = formatUnit(unit, dist == 1);

  return `${distStr} ${unitStr} away`;
}

type Props = {|
  event: ?Event,
  userLocation: ?Location,
  loading: boolean,
  onDirections: () => any,
  onMap: () => any
|};
type State = {|
  mapReady: boolean
|};

export default class MapCard extends Component<Props, State> {

  state = {
    mapReady: false
  }

  render() {
    const {
      event,
      loading,
      onDirections,
      onMap,
      userLocation
    } = this.props;
    const {mapReady} = this.state;

    var coord;
    if (!loading && event) {
      coord = {
        latitude: event.latitude,
        longitude: event.longitude
      };
    }

    var initialRegion;
    var marker;
    if (coord) {
      initialRegion = {
        ...coord,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      };

      marker = (<MapView.Marker coordinate={ coord } />);
    }

    return (<View style={ styles.container }>
              <FadeView
                        style={ styles.fadeView }
                        visible={ !loading }>
                <MapView
                         onPress={ () => onMap() }
                         liteMode={ true }
                         mapType={ Platform.OS === 'ios' ? "mutedStandard" : undefined }
                         scrollEnabled={ false }
                         cacheEnabled={ true }
                         pitchEnabled={ false }
                         rotateEnabled={ false }
                         zoomEnabled={ false }
                         showsUserLocation={ true }
                         legalLabelInsets={ { bottom: 58 } }
                         loadingIndicatorColor="transparent"
                         loadingBackgroundColor="#E0E0E0"
                         onMapReady={ () => this.setState({ mapReady: true }) }
                         style={ styles.map }
                         initialRegion={ initialRegion }>
                  { marker }
                </MapView>
              </FadeView>
              <FadeView
                        style={ styles.distBox }
                        visible={ !!coord }>
                <Text style={ styles.distText }>
                  { (userLocation && coord) ? formatDistance(userLocation, coord) : null }
                </Text>
              </FadeView>
              <View style={ styles.bottomBar }>
                <FadeView
                          style={ styles.bottomBarContent }
                          visible={ !loading }>
                  <Text
                        numberOfLines={ 2 }
                        style={ styles.name }>
                    { event ? event.place : null }
                  </Text>
                  <Button
                          onPress={ () => onDirections() }
                          style={ styles.directionsButton }>
                    DIRECTIONS
                  </Button>
                </FadeView>
              </View>
            </View>);
  }
}

const styles = StyleSheet.create({
  distBox: {
    position: 'absolute',
    top: 16,
    left: 8,
    backgroundColor: 'rgba(255,255,255,0.8)',
    height: 32,
    padding: 8,
    opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  distText: {
    fontFamily: 'Helvetica Neue',
    fontSize: 14
  },
  name: {
    fontFamily: 'Helvetica Neue',
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '500',
    color: '#4D4D4D',
    flex: 1
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 48,
    backgroundColor: 'white',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  bottomBarContent: {
    flex: 1,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  map: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden'
  },
  container: {
    marginTop: 32,
    height: 8 * 24,
    borderRadius: 8,
    shadowRadius: 8,
    shadowOpacity: 0.1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    elevation: 1,
    backgroundColor: '#E0E0E0'
  },
  directionsButton: {
    marginLeft: 16
  },
  fadeView: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden'
  }
});
