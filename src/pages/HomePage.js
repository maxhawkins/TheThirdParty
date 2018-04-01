// @flow

import type {Dest, EventID, DestGenerateResult} from '../API';
import type {Location} from '../Geolocation';
import type {ConnectedProps, ExplicitConnectOptions} from '../connect';
import type {HomePageSection} from '../types';

import explicitConnect from '../connect';
import { getDests } from '../selectors';
import {
    generateDest,
    listDests,
    openMap,
    changeHomePageSection,
    selectEvent,
    showDirections
} from '../actions';
import { openProfile } from '../actions/profileActions';
import EventCard from '../components/EventCard';
import MapCard from '../components/MapCard';
import { FooterViewContainer } from '../components/FooterView';
import React, { Component } from 'react';
import {
    ActivityIndicator,
    AppRegistry,
    FlatList,
    Image,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { connect } from 'react-redux';
import WaitListInfo from '../components/WaitListInfo';

type StateProps = {|
  currentSection: HomePageSection,
  dests: Array<Dest>,
  error: ?Error,
  generateResult: DestGenerateResult,
  isLoading: bool,
  userLocation: ?Location,
  waitlistActive: boolean,
  waitlistPlace: number
|};
type DispatchProps = {|
  onDirections: (EventID) => Promise<void>,
  onMap: (EventID) => Promise<void>,
  onProfile: (EventID) => Promise<void>,
  onRefresh: () => Promise<void>,
  onSelectEvent: (EventID) => Promise<void>,
  onSectionChange: (HomePageSection) => Promise<void>
|}
type Props = ConnectedProps<{||}, StateProps, DispatchProps> ;

type State = {||}

export default class HomePage extends Component<Props, State> {

  static defaultProps = {
    onSelectEvent: () => null
  }

  onScroll = (event: any) => {
    const {
      onSectionChange,
      currentSection
    } = this.props;

    const offset: number = event.nativeEvent.contentOffset.y;

    let section;
    if (offset < -60) {
      section = 'refresh';
    } else if (offset < 250) {
      section = 'next-event';
    } else {
      section = 'history';
    }

    if (currentSection !== section) {
      onSectionChange(section);
    }
  }

  onScrollEnd = () => {
    const {
      currentSection,
      onRefresh
    } = this.props;

    if (currentSection === 'refresh') {
      onRefresh();
    }
  }

  renderRefreshControl(scrollProps: any) {
    const {
      onRefresh,
      isLoading
    } = this.props;

    return (<RefreshControl
                            onRefresh={ onRefresh }
                            progressViewOffset={ scrollProps.progressViewOffset }
                            refreshing={ isLoading } />);
  }

  renderScrollComponent = (scrollProps: any) => {
    return (<ScrollView
                        {...scrollProps}
                        onScrollEndDrag={ this.onScrollEnd }
                        onScroll={ this.onScroll } />);
  }

  renderItem(dest: Dest, index: number) {
    const {
      currentSection,
      isLoading,
      onDirections,
      onMap,
      onSelectEvent,
      userLocation
    } = this.props;

    const showLoading = isLoading || currentSection === 'refresh';

    return (<View style={ {
                padding: 16
              } }>
              <EventCard
                         loading={ showLoading }
                         onPress={ () => onSelectEvent(dest.eventID) }
                         event={ dest.event } />
              { (index === 0 && dest.status === 'going')
                ? (  <Text>
                       Going
                     </Text>)
                : null }
              { index === 0
                ? (  <MapCard
                              loading={ showLoading }
                              onMap={ () => onMap(dest.eventID) }
                              onDirections={ () => onDirections(dest.eventID) }
                              userLocation={ userLocation }
                              event={ dest.event } />)
                : null }
            </View>);
  }

  renderHeader = () => {
    var {
      currentSection,
      generateResult,
      isLoading
    } = this.props;

    let text = null;
    let subtitle = null;
    if (isLoading) {
      text = "LOADING...";
    } else if (currentSection === 'refresh') {
      text = "RELEASE TO REFRESH";
    } else {
      switch (generateResult) {
        case 'no-results':
          text = 'NOTHING YET...';
          subtitle = `Try again later. We’ll find an event soon.`;
          break;

        case 'wait':
          text = 'NO NEW EVENTS:'
          subtitle = `Try going to this event first. It’ll be great!`;
          break;

        case 'error':
          text = "OOPS!"
          subtitle = "There was a problem. Try again later."
          break;

        default:
          text = "YOUR NEXT EVENT:";
          break;
      }

    }

    return (<View style={ styles.headerBox }>
              <View style={ styles.header }>
                <Text style={ styles.yourNextEvent }>
                  { text }
                </Text>
                <Text style={ styles.nextEventSubtitle }>
                  { subtitle }
                </Text>
              </View>)
            </View>);
  }

  render() {
    var {
      dests,
      userLocation,
      isLoading,
      error,
      waitlistActive,
      waitlistPlace
    } = this.props;

    if (waitlistActive) {
      return (<View style={ styles.container }>
                <WaitListInfo place={ waitlistPlace } />
                <FooterViewContainer />
              </View>);
    }

    return (<View style={ styles.container }>
              <FlatList
                        style={ styles.list }
                        renderScrollComponent={ this.renderScrollComponent }
                        refreshing={ isLoading }
                        ListHeaderComponent={ this.renderHeader }
                        contentContainerStyle={ styles.scrollContainer }
                        keyExtractor={ (item, idx) => String(item.id) }
                        data={ dests }
                        renderItem={ ({item, index}) => this.renderItem(item, index) } />
              <FooterViewContainer />
            </View>);
  }

}

const options: ExplicitConnectOptions<{||}, StateProps, DispatchProps> = {
  mapStateToProps: (state) => ({
    currentSection: state.homePageSection,
    dests: getDests(state),
    error: state.dests.error,
    generateResult: state.dests.generateResult,
    isLoading: state.dests.isLoading,
    userLocation: state.userLocation,
    waitlistActive: state.waitlist.active,
    waitlistPlace: state.waitlist.place
  }),
  mapDispatchToProps: dispatch => ({
    onSelectEvent: async (id) => {
      await dispatch(selectEvent(id))
    },
    onProfile: async () => {
      await dispatch(openProfile())
    },
    onRefresh: async () => {
      await dispatch(generateDest())
    },
    onDirections: async (id) => {
      await dispatch(showDirections(id))
    },
    onMap: async (id) => {
      await dispatch(openMap(id))
    },
    onSectionChange: async (section) => {
      await dispatch(changeHomePageSection(section));
    }
  }),
  component: HomePage
};

export const HomePageContainer = explicitConnect(options);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA'
  },
  list: {
    flex: 1
  },
  scrollContainer: {
    paddingBottom: 120
  },
  yourNextEvent: {
    letterSpacing: 1,
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white'
  },
  nextEventSubtitle: {
    fontFamily: 'Helvetica Neue',
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2
  },
  header: {
    position: 'absolute',
    backgroundColor: '#E13B16',
    bottom: -175,
    top: -300,
    paddingBottom: 125,
    paddingTop: 300,
    left: 0,
    right: 0,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerBox: {
    backgroundColor: 'blue',
    height: getStatusBarHeight() + 60
  }
});
