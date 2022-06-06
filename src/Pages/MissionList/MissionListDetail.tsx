import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';

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
    const today = `${day.year}-${('00' + day.month.toString()).slice(-2)}-${(
      '00' + day.day.toString()
    ).slice(-2)}`;
    console.log(today);

    const allMissionList: any[] = [];

    const getList = await service.mission
      .getLastMission(axiosSrc.getLastMission + user.childId, today)
      .then(res => {
        return res.docs;
      });

    getList.map((data: any) => {
      const nameAndState: any = {};
      nameAndState['name'] = data.content[0].name;
      nameAndState['state'] = data.mission_state == 'done' ? true : false;
      allMissionList.push(nameAndState);
    });
    setMissionList(allMissionList);
  };

  useEffect(() => {
    handleGetMissionData();
  }, []);

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
          {typeof missionList != 'undefined' ? (
            missionList.length != 0 ? (
              missionList.map(
                (data: { name: string; state: boolean }, idx: number) => {
                  return (
                    <View style={styles.missionContainer} key={idx}>
                      <Image
                        source={require('../../static/images/Mission/missionImg.png')}
                        style={styles.missionImage}
                      />
                      <Typography
                        value={data.name}
                        type="subtitle"
                        textStyle={styles.missionText}
                      />
                      {data.state ? (
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
                },
              )
            ) : (
              <View
                style={{
                  display: 'flex',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <LottieView
                  source={require('../../static/images/MissionList/none.json')}
                  autoPlay
                  loop
                  style={{ width: '85%' }}
                />
                <Typography
                  value={'해당 날짜에\n수행한 미션이 없습니다.'}
                  type="subtitle"
                  textStyle={{ lineHeight: 35, fontSize: 23, marginTop: '5%' }}
                />
              </View>
            )
          ) : (
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
          )}
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
