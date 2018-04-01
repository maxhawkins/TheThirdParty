import { launch, selectEvent } from './src/actions';
import DialogContainer from './src/containers/DialogContainer';
import MainStore from './src/mainStore';
import { RSVPSheetContainer } from './src/pages/RSVPSheet';
import Router from './src/Router';
import React, { Component } from 'react';
import {
    AppRegistry,
    PermissionsAndroid,
    View
} from 'react-native';
import codePush from "react-native-code-push";
import { Provider } from 'react-redux';

export class ThirdParty extends Component {

  async componentWillMount() {
    await this.props.store.dispatch(launch());
  }

  render() {
    return (<Provider store={ this.props.store }>
              <View style={ { flex: 1 } }>
                <Router />
                <RSVPSheetContainer />
                <DialogContainer />
              </View>
            </Provider>);
  }
}

ThirdPartyContainer = codePush(() => (
  <ThirdParty store={ MainStore() } />
));

export default ThirdPartyContainer;

AppRegistry.registerComponent('ThirdParty', () => ThirdPartyContainer);
