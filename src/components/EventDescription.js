// @flow

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

type Props = {|
  open: boolean,
  text: string,
  maxLength: number
|};
type State = {|
  open: boolean,
|}

function truncate(text, length) {
  if (text.length <= length) {
    return text;
  }

  return text.slice(0, length) + "…";
}

export default class EventDescription extends Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      open: props.open || false
    };
  }

  render() {
    var {text, maxLength} = this.props;

    var body = null;
    if (this.state.open || text.length <= maxLength) {
      body = (<Text style={ styles.descriptionText }>
                { text }
              </Text>);
    } else {

      body = (<View>
                <Text style={ styles.descriptionText }>
                  { truncate(this.props.text, maxLength) + " " }
                </Text>
                <TouchableHighlight
                                    underlayColor="#e6eaed"
                                    onPress={ () => this.setState({ open: true }) }
                                    style={ styles.link }>
                  <Text style={ styles.linkText }>
                    See More
                  </Text>
                </TouchableHighlight>
              </View>);
    }

    return (<View style={ styles.description }>
              <Text style={ styles.descriptionHeader }>
                About:
              </Text>
              { body }
            </View>);
  }
}

const styles = StyleSheet.create({
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
  link: {
    width: 65,
    height: 14,
    alignItems: 'center'
  },
  linkText: {
    textDecorationLine: "underline",
    color: "#2D9CDB"
  }
});
