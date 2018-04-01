// @flow

import type {StyleValue} from 'StyleSheetTypes';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TouchableWithoutFeedback,
    ActivityIndicator
} from 'react-native';

type Props = {
  style?: StyleValue,
  isLoading: boolean,
  label: string,
  disabled: boolean,
  onPress: () => any
};

export default class SubmitButton extends Component<Props> {
  render() {
    const {
      style,
      isLoading,
      disabled,
      label,
      onPress
    } = this.props;

    let buttonStyle = [styles.submitButton, style];
    if (isLoading) {
      buttonStyle.push(styles.submitButtonLoading);
    }

    return (<View style={ styles.submitButtonContainer }>
              <TouchableWithoutFeedback
                                        {...this.props}
                                        onPress={ onPress }
                                        disabled={ disabled || isLoading }>
                <View style={ [buttonStyle] }>
                  <Text style={ styles.submitButtonText }>
                    { label }
                  </Text>
                  <ActivityIndicator
                                     style={ [
                                               styles.spinner,
                                               isLoading ? { opacity: 1 } : { opacity: 0 }
                                             ] }
                                     color="white"
                                     size="small" />
                </View>
              </TouchableWithoutFeedback>
            </View>);
  }
}

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: '#E13B16',
    borderRadius: 99,
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  submitButtonLoading: {
    backgroundColor: '#CF3F1F'
  },
  submitButtonText: {
    color: 'white',
    fontFamily: 'Helvetica Neue',
    fontWeight: '500',
    fontSize: 18,
    paddingLeft: 30
  },
  submitButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 5
  },
  spinner: {
    marginLeft: 15
  }
});
