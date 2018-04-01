import {
    Platform,
    Dimensions
} from 'react-native';

export default function isiPhoneX() {
  const {height, width} = Dimensions.get('window');

  return (
    Platform.OS === 'ios' &&
    (height === 812 || width === 812)
  );
}
