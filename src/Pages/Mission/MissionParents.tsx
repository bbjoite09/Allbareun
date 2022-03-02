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
import Typography from '../../Components/Typography';

const { width } = Dimensions.get('screen');

const MissionChild = () => {
  const [isSelect, setSelect] = useState<any>({
    id1: false,
    id2: false,
    id3: false,
  });

  const handleMission = (id: any, mission: string) => {
    return (
      <Pressable
        style={[
          styles.missionContainer,
          { backgroundColor: isSelect[id] ? '#ACE1C8' : 'white' },
        ]}
        onPress={() => {
          setSelect({ ...isSelect, [id]: !isSelect[id] });
        }}>
        <Image
          source={require('../../Assets/Mission/missionImg.png')}
          style={styles.missionImage}
        />
        <Typography
          value={mission}
          type="subtitle"
          textStyle={styles.missionText}
        />
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <Image
        source={require('../../Assets/logoTop.png')}
        style={styles.logoStyle}
      />
      <Typography
        value="오늘의 미션"
        type="title"
        containerStyle={{ marginBottom: 20 }}
      />
      <View style={{ flexDirection: 'column' }}>
        {handleMission('id1', '오이 먹기')}
        {handleMission('id2', '점심 남기지 않기')}
        {handleMission('id3', '오렌지 반개 먹기')}
      </View>

      <Pressable style={styles.selectButton}>
        <Typography
          value="미션 선택 완료"
          type="title"
          textStyle={{ textDecorationLine: 'none' }}
        />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  missionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderColor: '#E4E4E4',
    borderWidth: 1,
    width: width,
    height: 76,
    marginBottom: -1,
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
  buttonContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 10,
  },
  buttonStyle: {
    width: 73,
    height: 42,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    marginLeft: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#ACE1C8',
        shadowOffset: {
          width: 10,
          height: 10,
        },
        shadowOpacity: 0.8,
        shadowRadius: 5,
      },
      android: {
        elevation: 20,
      },
    }),
  },
  logoStyle: {
    width: width,
    height: 105,
    marginBottom: 50,
  },
  pageContainer: {
    flex: 1,
    alignItems: 'center',
  },

  selectButton: {
    width: 248,
    height: 41,
    backgroundColor: '#8CC751',
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 30,
  },
});

export default MissionChild;
