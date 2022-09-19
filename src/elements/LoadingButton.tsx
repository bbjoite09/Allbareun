import LottieView from 'lottie-react-native';
import React from 'react';
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

interface LoadingBtnProps {
  containerStyle?: StyleProp<ViewStyle>;
}
const LoadingButton: React.FC<LoadingBtnProps> = props => {
  return (
    <View style={[styles.btnContainer, props.containerStyle]}>
      <LottieView
        style={{ width: '100%' }}
        autoSize={false}
        source={require('../static/images/loadingButton.json')}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    width: 248,
    height: 41,
    backgroundColor: '#8CC751',
    borderRadius: 10,
    justifyContent: 'center',
    position: 'absolute',
    alignItems: 'center',
  },
});

export default LoadingButton;
