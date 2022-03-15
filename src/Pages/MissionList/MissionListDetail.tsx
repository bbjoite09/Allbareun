import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import { RootStackParamList } from '../../../App';
import Typography from '../../Components/Typography';

const { width } = Dimensions.get('screen');
type Props = NativeStackScreenProps<RootStackParamList, 'MissionListDetail'>;

const MissionListDetail = ({ navigation, route }: Props) => {
  const { day }: any = route.params;

  const getMission = (mission: any) => {
    return (
      <View style={[styles.missionContainer]}>
        <Image
          source={require('../../Assets/Mission/missionImg.png')}
          style={styles.missionImage}
        />
        <Typography
          value={mission}
          type="subtitle"
          textStyle={styles.missionText}
        />
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => navigation.navigate('MissionList')}>
        <Image
          source={require('../../Assets/logoTop.png')}
          style={styles.logoStyle}
        />
      </Pressable>
      <Typography
        value={`${day.year}년 ${day.month}월 ${day.day}일`}
        type="title"
        containerStyle={{ marginBottom: 20 }}
      />
      <View style={{ flexDirection: 'column' }}>
        {getMission('오이 먹기')}
        {getMission('점심 남기지 않기')}
        {getMission('오렌지 반개 먹기')}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  missionContainer: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: width,
    height: 76,
    marginTop: 10,
  },
  missionImage: {
    width: 47,
    height: 47,
    borderRadius: 25,
    borderWidth: 3,
    marginLeft: 10,
    borderColor: '#333333',
    backgroundColor: 'white',
  },
  missionText: {
    marginLeft: 20,
    textAlignVertical: 'center',
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  logoStyle: {
    width: width,
    height: 105,
    marginBottom: 50,
  },
});

export default MissionListDetail;
