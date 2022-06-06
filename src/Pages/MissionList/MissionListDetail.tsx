import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import { useSelector } from 'react-redux';
import { RootStackParamList } from '../../../App';
import Typography from '../../elements/Typography';
import { RootState } from '../../redux/store';
import { service } from '../../services';
import { axiosSrc } from '../../static/url/axiosSrc';

const { width } = Dimensions.get('screen');
type Props = NativeStackScreenProps<RootStackParamList, 'MissionListDetail'>;

const MissionListDetail = ({ navigation, route }: Props) => {
  const { day }: any = route.params;
  const { user } = useSelector((state: RootState) => state);
  const [missionList, setMissionList] = useState<any>();

  const handleGetMissionData = async () => {
    await service.food.getFoodList(axiosSrc.getFood + user.childId);
    await service.food.getReport(axiosSrc.report + user.childId);
    const getList = await service.mission.getRecommendMission(
      axiosSrc.getRecommendMission + user.childId,
    );
    setMissionList({ ...getList });
  };

  useEffect(() => {
    handleGetMissionData();
  }, []);

  const handleMission = (mission: string) => {
    if (typeof missionList != 'undefined') {
      const randomIdx = Math.floor(Math.random() * 2);
      return (
        <View style={styles.missionContainer}>
          <Image
            source={require('../../static/images/Mission/missionImg.png')}
            style={styles.missionImage}
          />
          <Typography
            value={mission}
            type="subtitle"
            textStyle={styles.missionText}
          />
          {randomIdx ? (
            <View style={styles.buttonContainer}>
              <Typography value="✅ 성공함" type="subtitle" />
            </View>
          ) : (
            <View style={styles.buttonContainer}>
              <Typography value="❌ 실패함" type="subtitle" />
            </View>
          )}
        </View>
      );
    } else {
      return (
        <View style={[styles.missionContainer]}>
          <View
            style={[
              styles.missionImage,
              { backgroundColor: 'white', borderColor: 'white' },
            ]}
          />
          <View
            style={{
              width: Math.floor(Math.random() * (250 - 130) + 130),
              backgroundColor: 'white',
              height: 20,
              borderRadius: 50,
              marginLeft: 20,
            }}
          />
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => navigation.navigate('MissionList')}>
        <Image
          source={require('../../static/images/logoTop.png')}
          style={styles.logoStyle}
        />
      </Pressable>
      <Typography
        value={`${day.year}년 ${day.month}월 ${day.day}일`}
        type="title"
        containerStyle={{ marginBottom: 30 }}
      />
      <ScrollView>
        <View style={{ flexDirection: 'column' }}>
          {handleMission(missionList?.mission1.name + ' 먹기')}
          {handleMission(missionList?.mission2.name + ' 먹기')}
          {handleMission(missionList?.mission3.name + ' 먹기')}
          {handleMission(missionList?.mission4.name + ' 먹기')}
          {handleMission(missionList?.mission5.name + ' 먹기')}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  missionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#e9ecef',
    borderColor: 'white',
    borderWidth: 1,
    width: width,
    height: 80,
    marginBottom: 10,
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
    width: '55%',
    textAlign: 'left',
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
  buttonContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 10,
  },
});

export default MissionListDetail;
