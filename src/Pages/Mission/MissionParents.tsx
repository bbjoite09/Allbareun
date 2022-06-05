import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import * as Progress from 'react-native-progress';
import { useSelector } from 'react-redux';
import Typography from '../../elements/Typography';
import { RootState } from '../../redux/store';
import foodDB from '../../static/datas/foodList.json';

const { width } = Dimensions.get('screen');

const MissionParents = () => {
  const [isSelect, setSelect] = useState<any>([false, false, false]);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState<any>();
  const [search, setSearch] = useState<any>(null);
  const [personalEnergy, setPersonalEnergy] = useState<any>([0]);
  const [energy, setEnergy] = useState<any>([0, 0, 0, 0, 0, 0]);
  const [personalMission, setPersonalMission] = useState<any>([]);

  const { user } = useSelector((state: RootState) => state);

  const addEnergy = (id: number, kcal: number) => {
    if (isSelect[id]) {
      setEnergy([...energy.slice(0, id + 1), 0, ...energy.slice(id + 2)]);
    } else {
      setEnergy([...energy.slice(0, id + 1), kcal, ...energy.slice(id + 2)]);
    }
  };

  const handleMission = (id: number, mission: string, kcal: number) => {
    return (
      <Pressable
        style={[
          styles.missionContainer,
          { backgroundColor: isSelect[id] ? '#ACE1C8' : 'white' },
        ]}
        onPress={() => {
          setSelect([
            ...isSelect.slice(0, id),
            !isSelect[id],
            ...isSelect.slice(id + 1),
          ]);
          addEnergy(id, kcal);
        }}>
        <Image
          source={require('../../static/images/Mission/missionImg.png')}
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

  const getModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={{
                width: '100%',
                height: 45,
                paddingLeft: '5%',
                fontSize: 16,
                borderWidth: 1,
                borderColor: '#BED0AB',
              }}
              placeholder="추가할 음식을 입력하세요."
              onChangeText={(e: any) => {
                setText(e);
              }}
            />
            <ScrollView style={{ width: '100%' }}>
              {foodDB
                .filter(data => {
                  if (data.name.includes(text)) {
                    return data;
                  }
                  if (search === '') {
                    return;
                  } else if (search == null) {
                    null;
                  }
                })
                .map(data => {
                  return (
                    <Pressable
                      key={data.id}
                      onPress={() => {
                        setPersonalEnergy([...personalEnergy, data.energy]);
                        setPersonalMission([...personalMission, data.name]);
                        setModalVisible(!modalVisible);
                      }}>
                      <View style={styles.modalList}>
                        <Text style={[styles.modalText, { textAlign: 'left' }]}>
                          {data.name}
                        </Text>
                        <Text style={styles.modalText}>
                          {Math.round(data.energy)}kcal
                        </Text>
                      </View>
                    </Pressable>
                  );
                })}
            </ScrollView>
            <View>
              <Pressable
                style={styles.selectButton}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.moddalButtonText}>닫기</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '5%',
        }}>
        <Text>총 열량 : </Text>
        <Progress.Bar
          animationType="timing"
          progress={
            (energy.reduce((sum: any, now: any) => sum + now) +
              personalEnergy.reduce((sum: any, now: any) => sum + now)) /
            user.userKcal
          }
          width={width - 150}
          height={20}
          color={'rgba(0, 130, 80, 1)'}
          style={{
            marginLeft: '3%',
            marginRight: '3%',
            backgroundColor: 'rgba(0, 130, 80, 0.2)',
          }}
        />
        <Image
          source={
            energy.reduce((sum: any, now: any) => sum + now) +
              personalEnergy.reduce((sum: any, now: any) => sum + now) <
            user.userKcal
              ? require('../../static/images/Mission/pigGray.png')
              : require('../../static/images/Mission/pig.png')
          }
          style={{ resizeMode: 'contain', width: 30, height: 30 }}
        />
      </View>
      <ScrollView>
        {personalMission.map((data: any, idx: number) => {
          return (
            <Pressable
              key={idx}
              style={[styles.missionContainer, { backgroundColor: '#ACE1C8' }]}
              onPress={() => {
                setPersonalEnergy([
                  ...personalEnergy.slice(0, idx + 1),
                  ...personalEnergy.slice(idx + 2),
                ]);
                setPersonalMission([
                  ...personalMission.slice(0, idx),
                  ...personalMission.slice(idx + 1),
                ]);
              }}>
              <Image
                source={require('../../static/images/Mission/missionImg.png')}
                style={styles.missionImage}
              />
              <Typography
                value={data + ' 먹기'}
                type="subtitle"
                textStyle={styles.missionText}
              />
            </Pressable>
          );
        })}
        <View style={{ flexDirection: 'column' }}>
          {handleMission(0, '오이 먹기', 30)}
          {handleMission(1, '고등어 조림 먹기', 122)}
          {handleMission(2, '오렌지 반개 먹기', 100)}
        </View>
        <View style={{ flexDirection: 'column' }}>
          {getModal()}
          {energy.reduce((sum: any, now: any) => sum + now) +
            personalEnergy.reduce((sum: any, now: any) => sum + now) >=
          user.userKcal
            ? Alert.alert(
                '꿀꿀~ 돼지경보🐽',
                '체중관리를 위해 음식을 빼주세요!',
              )
            : null}
          <Pressable
            style={[styles.missionContainer, { backgroundColor: '#D9D9D9' }]}
            onPress={() => setModalVisible(true)}>
            <Image
              source={require('../../static/images/Mission/plus.png')}
              style={[
                styles.missionImage,
                {
                  borderWidth: 0,
                  width: 50,
                  height: 50,
                  backgroundColor: '#D9D9D9',
                },
              ]}
            />
            <Typography
              value={'직접 추가하기'}
              type="subtitle"
              textStyle={styles.missionText}
            />
          </Pressable>
        </View>
      </ScrollView>
      <Pressable style={[styles.selectButton, { marginBottom: 30 }]}>
        <Typography
          value="미션 선택 완료"
          type="title"
          textStyle={{
            textDecorationLine: 'none',
            color: 'white',
            fontSize: 22,
          }}
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
    height: '50%',
  },
  modalList: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#BED0AB',
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginLeft: '2%',
  },
  moddalButtonText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
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
    marginBottom: 20,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },

  selectButton: {
    width: 248,
    height: 41,
    backgroundColor: '#8CC751',
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: '5%',
  },
});

export default MissionParents;
