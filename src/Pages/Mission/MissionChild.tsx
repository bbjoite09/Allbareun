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
import Typography from '../../elements/Typography';
import { service } from '../../services';

const { width } = Dimensions.get('screen');

const MissionChild = () => {
  // const [isSelect, setSelect] = useState([false, false, false]);
  const [isSelect, setSelect] = useState<any>({
    id1: false,
  });
  // const [isSuccess, setSuccess] = useState([false, false, false]);
  const [isSuccess, setSuccess] = useState<any>({
    id1: false,
  });

  const handleSelectState = (name: string, result: string) => {
    setSelect({ ...isSelect, [name]: true });

    if (result == 'success') {
      setSuccess({ ...isSuccess, [name]: true });
    } else {
      setSuccess({ ...isSuccess, [name]: false });
    }
  };

  const handleMission = (name: string) => {
    return (
      <View
        style={[
          styles.missionContainer,
          { backgroundColor: `${isSelect[name] ? '#E4E4E4' : '#EDFF80'}` },
        ]}>
        <Image
          source={require('../../static/images/Mission/missionImg.png')}
          style={styles.missionImage}
        />
        <Typography
          value={name + ' 먹기'}
          type="subtitle"
          textStyle={styles.missionText}
        />
        {!isSelect[name] && (
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.buttonStyle}
              onPress={() => {
                handleSelectState(name, 'success');
                Toast.show('미션 성공 🎉', Toast.SHORT, ['UIAlertController']);
                service.food.enrollFood(name);
              }}>
              <Typography value="성공" type="subtitle" />
            </Pressable>
            <Pressable
              style={styles.buttonStyle}
              onPress={() => {
                handleSelectState(name, 'fail');
                Toast.show('미션 실패 💦');
              }}>
              <Typography value="실패" type="subtitle" />
            </Pressable>
          </View>
        )}
        {isSuccess[name] && (
          <View style={styles.buttonContainer}>
            <Typography value="✅ 성공함" type="subtitle" />
          </View>
        )}
        {isSelect[name] && !isSuccess[name] && (
          <View style={styles.buttonContainer}>
            <Typography value="❌ 실패함" type="subtitle" />
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../static/images/logoTop.png')}
        style={styles.logoStyle}
      />
      <Typography
        value="오늘의 미션"
        type="title"
        containerStyle={{ marginBottom: 20 }}
      />
      <View style={{ flexDirection: 'column' }}>
        {handleMission('닭갈비')}
        {handleMission('멸치풋고추볶음')}
        {handleMission('가자미전')}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  missionContainer: {
    flexDirection: 'row',
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
    width: '37%',
    textAlign: 'left',
    lineHeight: 25,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 10,
  },
  buttonStyle: {
    width: 67,
    height: 40,
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
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
});

export default MissionChild;
