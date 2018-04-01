// @flow

import type {Event, EventID} from '../API';
import type {ConnectedProps, ExplicitConnectOptions} from '../connect';

import { closeEvent, showDirections, showFacebook } from '../actions/index';
import EventDescription from '../components/EventDescription';
import Toolbar from '../components/Toolbar';
import explicitConnect from '../connect';
import { getSelectedEvent } from '../selectors';
import moment from 'moment';
import React, { Component } from 'react';
import {
    AppRegistry,
    Image,
    Linking,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

function formatTime(timeStr: moment$Moment | string, withMeridiem: boolean = true): string {
  const time = moment(timeStr).local();

  var result = time.format('h');
  if (time.minutes() > 0) {
    result += time.format(':mm');
  }
  if (withMeridiem) {
    result += time.format(' A');
  }

  return result;
}

function formatRange(startStr: moment$Moment | string, endStr: string): string {
  var start = moment(startStr).local();
  var end = moment(endStr).local();

  var withMeridiem = false;
  if (start.diff(end, 'hours') > 12 || start.format('a') != end.format('a')) {
    withMeridiem = true;
  }

  return `${start.format('MMM D')} · ${formatTime(start, withMeridiem)} - ${formatTime(end)}`;
}

type StateProps = {|
  event: ?Event
|};
type DispatchProps = {|
  onBack: () => Promise<void>,
  onMap: (EventID) => Promise<void>,
  onFacebook: (EventID) => Promise<void> ,
|};
type Props = ConnectedProps<{||}, StateProps, DispatchProps> ;

export default class EventPage extends Component<Props> {

  render() {
    const {
      event,
      onBack,
      onMap,
      onFacebook
    } = this.props;

    if (!event) {
      // TODO(maxhawkins): handle this case
      return null;
    }

    return (
      <View style={ styles.container }>
        <Toolbar
                 left={ <TouchableOpacity
                                          hitSlop={ {
                                                      top: 20,
                                                      left: 20,
                                                      bottom: 20,
                                                      right: 20
                                                    } }
                                          accessibilityLabel="Back to Main Page"
                                          onPress={ () => onBack() }>
                          <Text>
                            BACK
                          </Text>
                        </TouchableOpacity> }
                 header="Your Event" />
        <ScrollView
                    contentContainerStyle={ styles.scrollContainer }
                    style={ styles.scroll }>
          <View style={ styles.imageBox }>
            <Image
                   resizeMode="cover"
                   style={ styles.image }
                   source={ { uri: event.cover } } />
          </View>
          <Text style={ styles.title }>
            { event.name }
          </Text>
          <Text style={ styles.date }>
            { formatRange(event.start_time, event.end_time) }
          </Text>
          <TouchableWithoutFeedback
                                    accessibilityLabel="See Directions"
                                    onPress={ () => onMap(event.id) }>
            <View style={ styles.location }>
              <Text style={ styles.placeName }>
                { event.place }
              </Text>
              <Text style={ styles.address }>
                { event.address }
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <EventDescription
                            open={ true }
                            text={ event.description }
                            maxLength={ 200 } />
          <View style={ styles.fbLink }>
            <Text>
              { "Source: " }
              <Text
                    onPress={ () => onFacebook(event.id) }
                    style={ styles.linkText }>
                Facebook
              </Text>
            </Text>
          </View>
        </ScrollView>
      </View>);
  }
}

const options: ExplicitConnectOptions<{||}, StateProps, DispatchProps> = {
  mapStateToProps: state => ({
    event: getSelectedEvent(state)
  }),
  mapDispatchToProps: dispatch => ({
    onBack: async () => {
      await dispatch(closeEvent())
    },
    onMap: async (eventID) => {
      await dispatch(showDirections(eventID))
    },
    onFacebook: async (eventID) => {
      await dispatch(showFacebook(eventID))
    }
  }),
  component: EventPage
};

export const EventPageContainer = explicitConnect(options);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scroll: {
    flex: 1
  },
  scrollContainer: {
    paddingTop: Platform.select({
      ios: getStatusBarHeight() + 50,
      android: 0
    }),
    paddingBottom: 120
  },
  link: {
    width: 65,
    height: 14,
    alignItems: 'center'
  },
  linkText: {
    textDecorationLine: "underline",
    color: "#2D9CDB"
  },
  fbLink: {
    margin: 20,
    alignItems: 'flex-end'
  },
  loader: {
    width: 0,
    height: 100
  },
  image: {
    flex: 1
  },
  placeName: {
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 20
  },
  address: {
    color: '#707070'
  },
  description: {
    padding: 20,
    paddingTop: 0
  },
  descriptionHeader: {
    paddingBottom: 20
  },
  descriptionText: {
    lineHeight: 18
  },
  location: {
    padding: 20,
    paddingRight: 200,
    borderColor: '#A8A8A8',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: '#FBFCF9',
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    padding: 20
  },
  date: {
    fontSize: 18,
    padding: 20,
    paddingTop: 0
  },
  imageBox: {
    backgroundColor: '#CCC',
    height: 200
  },
  text: {
    color: '#BBB'
  }
});
