import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Keyboard,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '../elements/Typography';
import { setUserData } from '../redux/modules/userInfo';
import { RootState } from '../redux/store';
import { service } from '../services';
import { axiosSrc } from '../static/url/axiosSrc';

const { width, height } = Dimensions.get('screen');

const MyPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputs, setInputs] = useState<any>({
    height: 0,
    weight: 0,
    age: 0,
    activeKcal: 0,
  });

  const [dateList, setDateList] = useState<any>([]);
  const [weightList, setWeightList] = useState<any>([]);
  const [heightList, setHeightList] = useState<any>([]);
  const [isSelect, setSelect] = useState<any>(true);

  const { user } = useSelector((state: RootState) => state);
  const axiosUrl = axiosSrc.health + '/' + user.childId;

  const dispatch = useDispatch();

  const getGraphData = async () => {
    const userInfo = await service.health.getBodyData(
      axiosSrc.health + '/' + user.childId,
    );
    const userInfoData = userInfo.data;

    if (
      userInfoData.bodyinfo.length <= 5 &&
      userInfoData.bodyinfo.length >= 1
    ) {
      const healthTotalList: {
        date: string;
        weight: number;
        height: number;
      }[] = [];
      userInfoData.bodyinfo.map((data: any) => {
        const healthList = { date: '', weight: 0, height: 0 };
        healthList['date'] = data.updatedAt.slice(5, 10).replaceAll('-', '/');
        healthList['weight'] = data.weight;
        healthList['height'] = data.height;
        healthTotalList.push(healthList);
      });
      return healthTotalList;
    } else if (userInfoData.bodyinfo.length > 5) {
      const healthTotalList: {
        date: string;
        weight: number;
        height: number;
      }[] = [];
      userInfoData.bodyinfo.map((data: any, idx: number) => {
        if (idx > userInfoData.bodyinfo.length - 6) {
          const healthList = { date: '', weight: 0, height: 0 };
          healthList['date'] = data.updatedAt.slice(5, 10).replaceAll('-', '/');
          healthList['weight'] = data.weight;
          healthList['height'] = data.height;
          healthTotalList.push(healthList);
        }
      });
      return healthTotalList;
    } else {
      return;
    }
  };

  useEffect(() => {
    getGraphData().then(res => {
      const oldDateList: any = [];
      const oldWeightList: any = [];
      const oldHeightList: any = [];
      res?.map(data => {
        oldDateList.push(data.date);
        oldWeightList.push(data.weight);
        oldHeightList.push(data.height);
      });
      setDateList(oldDateList);
      setWeightList(oldWeightList);
      setHeightList(oldHeightList);
    });
  }, [isSelect]);

  const getGraph = (growList: Array<number>) => {
    const data = {
      labels: dateList,
      datasets: [
        {
          data: growList,
          color: () => `#9CB96A`,
          strokeWidth: 2,
        },
      ],
    };

    return (
      <LineChart
        data={data}
        width={width - 25}
        height={170}
        chartConfig={chartConfig}
        withVerticalLines={false}
        style={styles.chartContainer}
        withShadow={false}
      />
    );
  };

  const handleEnroll = async () => {
    await service.health.setBodyData(
      inputs.weight,
      inputs.height,
      inputs.age,
      inputs.activeKcal,
      axiosUrl,
    );

    const userInfo = await service.health.getBodyData(
      axiosSrc.health + '/' + user.childId,
    );
    const userInfoData = userInfo.data;

    dispatch(
      setUserData(
        userInfoData.user.name,
        userInfoData.user.user_sex,
        userInfoData.bodyinfo.length == 0 ? '❌' : userInfoData.bodyinfo[0].bmi,
        userInfoData.bodyinfo.length == 0
          ? 1550
          : userInfoData.bodyinfo[userInfoData.bodyinfo.length - 1].user_kcal,
      ),
    );
    getGraphData();
    setSelect(!isSelect);
  };

  const handleInput = (title: string, key: string, autoFocuse?: boolean) => {
    return (
      <View style={[styles.rowContainer, { marginBottom: '5%' }]}>
        <Typography
          value={title}
          type="subtitle"
          containerStyle={{
            width: '30%',
            height: 35,
            backgroundColor: '#8CC751',
          }}
          textStyle={{ lineHeight: 35, color: 'white' }}
        />
        <TextInput
          placeholder={title + '을(를) 입력해주세요.'}
          style={styles.inputText}
          keyboardType={'numeric'}
          autoFocus={autoFocuse ? autoFocuse : false}
          autoCapitalize="none"
          onChangeText={e => setInputs({ ...inputs, [key]: Number(e) })}
          onSubmitEditing={() => {
            if (inputs.height > 0 && inputs.weight > 0 && inputs.age) {
              handleEnroll();
              setModalVisible(false);
            } else {
              Alert.alert('경고', '모든 값을 입력해주세요');
            }
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../static/images/logoTopDetail.png')}
        style={styles.logoStyle}
      />
      <ScrollView style={{ height }}>
        {/* 어린이 프로필 정보 */}
        <View style={styles.profileContainer}>
          <Image
            source={require('../static/images/MyPage/profileImg.jpeg')}
            style={styles.profileImage}
          />
          <View style={styles.profileText}>
            <View
              style={[
                styles.rowContainer,
                {
                  borderWidth: 0,
                },
              ]}>
              <Typography
                value={user.userSex == 'M' ? '남자   ' : '여자   '}
                type="subtitle"
                textStyle={{ fontWeight: '900', color: '#8CC751' }}
              />
              <Typography value={user.name + ' 어린이'} type="subtitle" />
            </View>
            <Typography
              value={' BMI 지수 :  ' + user.userBMI}
              type="subtitle"
              textStyle={{ textAlign: 'left', paddingTop: 10 }}
            />
          </View>
        </View>

        {/* 키, 몸무게 그래프 */}
        <View style={styles.growProfile}>
          <Typography value={user.name + '의 키와 몸무게'} type="subtitle" />
          <Pressable
            style={styles.addGrowButton}
            onPress={() => {
              setModalVisible(true);
              setSelect(!isSelect);
            }}>
            <Typography
              value="+"
              type="subtitle"
              textStyle={{ color: 'white' }}
            />
          </Pressable>
        </View>
        {getGraph(heightList)}
        {getGraph(weightList)}
      </ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Typography
                type="subtitle"
                value="키와 몸무게를 입력해주세요."
                textStyle={styles.modalText}
              />
              <View style={styles.modalInputContainer}>
                {handleInput('키', 'height', true)}
                {handleInput('몸무게', 'weight')}
                {handleInput('나이', 'age')}
                {handleInput('활동량', 'activeKcal')}
              </View>
              <Pressable
                style={styles.modalButton}
                onPress={async () => {
                  handleEnroll();
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>등록</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const chartConfig = {
  backgroundGradientFrom: 'white',
  backgroundGradientTo: 'white',
  color: () => `black`,
  decimalPlaces: 0,
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
  },
  logoStyle: {
    width: width,
    height: 75,
    marginBottom: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'space-evenly',
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

  modalButton: {
    width: 150,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#8CC751',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 19,
    textAlign: 'center',
  },
  modalInputContainer: { alignSelf: 'flex-start' },
  modalInput: {
    marginBottom: 20,
    fontSize: 16,
  },

  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8CC751',
  },
  inputText: {
    width: '70%',
    height: 35,
    fontSize: 15,
    paddingLeft: '5%',
  },
  profileContainer: {
    flexDirection: 'row',
    width: width - 45,
    borderColor: '#E4E4E4',
    borderWidth: 2,
    borderRadius: 20,
    height: 112,
    alignItems: 'center',
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: '#000000', //그림자색
        shadowOpacity: 0.3, //그림자 투명도
        shadowOffset: { width: 2, height: 2 },
      },
      android: {
        elevation: 3,
      },
    }),
  },
  profileImage: {
    width: 95,
    height: 95,
    marginLeft: 10,
    borderColor: 'white',
    borderWidth: 10,
  },
  profileText: {
    marginTop: 20,
    marginLeft: 15,
    alignSelf: 'flex-start',
    width: width - 240,
  },
  growProfile: {
    flexDirection: 'row',
    marginTop: 50,
    marginBottom: 15,
    alignSelf: 'flex-start',
  },
  addGrowButton: {
    width: 25,
    height: 25,
    marginLeft: 10,
    backgroundColor: '#9CB96A',
    borderRadius: 15,
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000000', //그림자색
        shadowOpacity: 0.3, //그림자 투명도
        shadowOffset: { width: 2, height: 2 },
      },
      android: {
        elevation: 3,
      },
    }),
  },
  chartContainer: {
    marginTop: 10,
    marginLeft: -30,
    marginBottom: 10,
  },
});

export default MyPage;
