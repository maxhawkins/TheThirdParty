// @flow

import { launch, selectEvent } from './src/actions';
import MainStore from './src/mainStore';
import { HomePageContainer } from './src/pages/HomePage';
import Router from './src/Router';
import React, { Component } from 'react';
import {
    AppRegistry,
    Image,
    PushNotificationIOS,
    Text,
    View
} from 'react-native';
import codePush from "react-native-code-push";
import { Provider } from 'react-redux';

type Props = {|
  store: Store
|};

export class ThirdParty extends Component<Props> {

  async componentWillMount() {
    await this.props.store.dispatch(launch());
  }

  render() {
    return (<Provider store={ this.props.store }>
              <View style={ { flex: 1 } }>
                <View style={ { flex: 1 } }>
                  <HomePageContainer />
                  <Router />
                </View>
              </View>
            </Provider>);
  }
}

const ThirdPartyContainer = codePush(() => (
  <ThirdParty store={ MainStore() } />
));

export default ThirdPartyContainer;

AppRegistry.registerComponent('ThirdParty', () => ThirdPartyContainer);
