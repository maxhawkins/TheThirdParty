// @flow

import type {Event, EventID} from '../API';
import type {ConnectedProps, ExplicitConnectOptions} from '../connect';

import { closeMap, openMap, showDirections } from '../actions/index';
import Button from '../components/Button';
import Toolbar from '../components/Toolbar';
import explicitConnect from '../connect';
import { getSelectedEvent } from '../selectors';
import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import MapView from 'react-native-maps';

type StateProps = {|
  event: ?Event
|}
type DispatchProps = {|
  onBack: () => Promise<void>,
  onDirections: (EventID) => Promise<void>
|}
type Props = ConnectedProps<{||}, StateProps, DispatchProps>

class MapPage extends Component<Props> {
  render() {
    const {
      event,
      onDirections
    } = this.props;

    const coord = {
      latitude: event ? event.latitude : 0,
      longitude: event ? event.longitude : 0
    };

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
              <Toolbar
                       left={ <TouchableOpacity
                                                hitSlop={ {
                                                            top: 20,
                                                            left: 20,
                                                            bottom: 20,
                                                            right: 20
                                                          } }
                                                accessibilityLabel="Back to Main Page"
                                                onPress={ () => this.props.onBack() }>
                                <Text>
                                  BACK
                                </Text>
                              </TouchableOpacity> }
                       header="Map" />
              <MapView
                       showsUserLocation={ true }
                       loadingBackgroundColor="#F9F5ED"
                       style={ styles.map }
                       initialRegion={ initialRegion }>
                { marker }
              </MapView>
              <View style={ styles.bottomBar }>
                <Text
                      numberOfLines={ 2 }
                      style={ styles.name }>
                  { event ? event.place : null }
                </Text>
                <Button
                        onPress={ () => {
                                    event ? onDirections(event.id) : null
                                  } }
                        style={ styles.directionsButton }>
                  DIRECTIONS
                </Button>
              </View>
            </View>);
  }
}

const options: ExplicitConnectOptions<{||}, StateProps, DispatchProps> = {
  mapStateToProps: (state) => ({
    event: getSelectedEvent(state)
  }),
  mapDispatchToProps: dispatch => ({
    onDirections: async (eventID) => {
      await dispatch(showDirections(eventID))
    },
    onBack: async () => {
      await dispatch(closeMap())
    }
  }),
  component: MapPage
};

export const MapPageContainer = explicitConnect(options);

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  container: {
    flex: 1,
    zIndex: 5
  },
  directionsButton: {
    marginLeft: 16
  },
  name: {
    color: '#4D4D4D',
    fontWeight: '500',
    fontFamily: 'Helvetica Neue',
    fontSize: 14,
    flex: 1
  },
  bottomBar: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center'
  }
});
