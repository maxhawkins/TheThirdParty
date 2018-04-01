// @flow

import { ActionSheetIOS } from 'react-native';

export interface ActionSheet {
  show(options: Array<any>): Promise<string> ;
}

export default class ActionSheetNative implements ActionSheet {
  show(options: Array<any>): Promise<string> {
    return new Promise((resolve) => {
      ActionSheetIOS.showActionSheetWithOptions({
        options: options.map(o => o.label),
        cancelButtonIndex: options.findIndex(o => o.isCancel),
        destructiveButtonIndex: options.findIndex(o => o.isDestructive)
      }, (i) => {
        const option = options[i];
        resolve(option.key);
      });
    });
  }
}
