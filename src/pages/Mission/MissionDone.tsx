import LottieView from 'lottie-react-native';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Typography from '../../elements/Typography';

const MissionDone = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        source={require('../../static/images/Mission/done.json')}
        autoPlay
        loop
        style={{ width: '80%', marginTop: '5%' }}
      />
      <Typography
        type="title"
        value="미션 전송 완료!"
        textStyle={{ textDecorationLine: 'none', marginTop: '10%' }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
});

export default MissionDone;
