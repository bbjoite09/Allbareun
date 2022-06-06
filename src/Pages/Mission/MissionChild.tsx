import React, { useEffect, useState } from 'react';
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
import Toast from 'react-native-simple-toast';
import { useSelector } from 'react-redux';
import Typography from '../../elements/Typography';
import { RootState } from '../../redux/store';
import { service } from '../../services';
import foodDB from '../../static/datas/foodList.json';
import { axiosSrc } from '../../static/url/axiosSrc';

const { width } = Dimensions.get('screen');

const MissionChild = () => {
  const [isSelect, setSelect] = useState<any>({
    id1: false,
  });
  const [isSuccess, setSuccess] = useState<any>({
    id1: false,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState<any>();
  const [search, setSearch] = useState<any>(null);
  const [personalMission, setPersonalMission] = useState<any>([]);
  const [missionList, setMissionList] = useState<any>();

  const { user } = useSelector((state: RootState) => state);

  const handleSelectState = (name: string, result: string) => {
    setSelect({ ...isSelect, [name]: true });

    if (result == 'success') {
      setSuccess({ ...isSuccess, [name]: true });
    } else {
      setSuccess({ ...isSuccess, [name]: false });
    }
  };

  const getMissionList = async () => {
    const missionList: object[] = [];
    const missionNameList: object[] = [];
    await service.mission
      .getMission(axiosSrc.getMissoin + user.childId)
      .then(res => {
        res.map((data: any) => {
          missionList.push(data.content);
        });
      });
    missionList.map((data: any) => {
      missionNameList.push(data[0].name);
    });
    setMissionList(missionNameList);
  };

  useEffect(() => {
    getMissionList();
  }, []);

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
                        setPersonalMission([...personalMission, data.name]);
                        service.mission.setMissionPersonalSuccess(
                          axiosSrc.setMissionPersonalSuccess + user.childId,
                          data.name,
                        );
                        setModalVisible(!modalVisible);
                      }}>
                      <View style={styles.modalList}>
                        <Text
                          style={[
                            styles.modalText,
                            { textAlign: 'left', width: '70%' },
                          ]}>
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
      <ScrollView>
        {personalMission.map((data: any, idx: number) => {
          return (
            <View
              key={idx}
              style={[styles.missionContainer, { backgroundColor: '#E4E4E4' }]}>
              <Image
                source={require('../../static/images/Mission/missionImg.png')}
                style={styles.missionImage}
              />
              <Typography
                value={data + ' 먹기'}
                type="subtitle"
                textStyle={[styles.missionText, { width: '50%' }]}
              />
              <View style={styles.buttonContainer}>
                <Typography value="🍚 추가섭취" type="subtitle" />
              </View>
            </View>
          );
        })}
        <View style={{ flexDirection: 'column' }}>
          {typeof missionList != 'undefined'
            ? missionList.map((data: any, idx: number) => {
                return (
                  <View
                    key={idx}
                    style={[
                      styles.missionContainer,
                      {
                        backgroundColor: `${
                          isSelect[data] ? '#E4E4E4' : '#EDFF80'
                        }`,
                      },
                    ]}>
                    <Image
                      source={require('../../static/images/Mission/missionImg.png')}
                      style={styles.missionImage}
                    />
                    <Typography
                      value={data + ' 먹기'}
                      type="subtitle"
                      textStyle={[
                        styles.missionText,
                        { width: isSelect[data] ? '55%' : '40%' },
                      ]}
                    />
                    {!isSelect[data] && (
                      <View style={styles.buttonContainer}>
                        <Pressable
                          style={styles.buttonStyle}
                          onPress={() => {
                            service.mission.setMissionRecommendSuccess(
                              axiosSrc.setMissionRecommendSuccess +
                                user.childId,
                              data,
                            );
                            handleSelectState(data, 'success');
                            Toast.show('미션 성공 🎉', Toast.SHORT, [
                              'UIAlertController',
                            ]);
                          }}>
                          <Typography value="성공" type="subtitle" />
                        </Pressable>
                        <Pressable
                          style={styles.buttonStyle}
                          onPress={() => {
                            handleSelectState(data, 'fail');
                            Toast.show('미션 실패 💦');
                          }}>
                          <Typography value="실패" type="subtitle" />
                        </Pressable>
                      </View>
                    )}
                    {isSuccess[data] && (
                      <View style={styles.buttonContainer}>
                        <Typography value="✅ 성공함" type="subtitle" />
                      </View>
                    )}
                    {isSelect[data] && !isSuccess[data] && (
                      <View style={styles.buttonContainer}>
                        <Typography value="❌ 실패함" type="subtitle" />
                      </View>
                    )}
                  </View>
                );
              })
            : null}
        </View>
        <View style={{ flexDirection: 'column' }}>
          {getModal()}
          <Pressable
            style={[styles.missionContainer, { backgroundColor: '#E4E4E4' }]}
            onPress={() => setModalVisible(true)}>
            <Image
              source={require('../../static/images/Mission/plus.png')}
              style={[
                styles.missionImage,
                {
                  borderWidth: 0,
                  width: 50,
                  height: 50,
                  backgroundColor: '#E4E4E4',
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
    width: '55%',
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
    marginBottom: 30,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },

  // 모달 style
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
  },
  moddalButtonText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
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

export default MissionChild;
