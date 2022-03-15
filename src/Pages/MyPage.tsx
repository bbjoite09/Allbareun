import React, { useState } from 'react';
import {
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
import Typography from '../Components/Typography';

const { width, height } = Dimensions.get('screen');

const MyPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isComplete, setComplete] = useState(false); // height, weight 작성 여부 for enter event
  const [inputs, setInputs] = useState<any>({ height: '', weight: '' });
  const date = new Date();
  const dateList = ['01/01', '01/21', '02/14', '02/31'];
  const weightList = [35, 34.3, 34.5, 34.5];
  const heightList = [150, 150.3, 150.5, 150.5];

  const getGraph = (type: string, growList: Array<number>) => {
    const data = {
      labels: !isComplete
        ? dateList
        : [...dateList, `${date.getMonth() + 1}/${date.getDate()}`],
      datasets: [
        {
          data: !isComplete ? growList : [...growList, inputs[type]],
          color: () => `#9CB96A`,
          strokeWidth: 2,
        },
      ],
    };

    return (
      <LineChart
        data={data}
        width={width - 45}
        height={170}
        chartConfig={chartConfig}
        withVerticalLines={false}
        style={styles.chartContainer}
        withShadow={false}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../Assets/logoTopDetail.png')}
        style={styles.logoStyle}
      />
      <ScrollView style={{ height }}>
        {/* 어린이 프로필 정보 */}
        <View style={styles.profileContainer}>
          <Image
            source={require('../Assets/MyPage/profileImg.jpeg')}
            style={styles.profileImage}
          />
          <View style={styles.profileText}>
            <Typography value="최시준 어린이" type="subtitle" />
            <Typography
              value="나이 : 11세"
              type="subtitle"
              textStyle={{ textAlign: 'left', paddingTop: 10 }}
            />
          </View>
        </View>

        {/* 키, 몸무게 그래프 */}
        <View style={styles.growProfile}>
          <Typography value="서준이의 키와 몸무게" type="subtitle" />
          <Pressable
            style={styles.addGrowButton}
            onPress={() => {
              setModalVisible(true);
            }}>
            <Typography
              value="+"
              type="subtitle"
              textStyle={{ color: 'white' }}
            />
          </Pressable>
        </View>
        {getGraph('height', heightList)}
        {getGraph('weight', weightList)}
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
                <TextInput
                  placeholder="키를 입력해주세요"
                  keyboardType="numeric"
                  autoFocus={true}
                  style={styles.modalInput}
                  onChangeText={e => setInputs({ ...inputs, ['height']: e })}
                />
                <TextInput
                  placeholder="몸무게를 입력해주세요"
                  keyboardType="numeric"
                  style={styles.modalInput}
                  onChangeText={e => setInputs({ ...inputs, ['weight']: e })}
                  onSubmitEditing={() => {
                    setModalVisible(!modalVisible);
                    setComplete(true);
                  }}
                />
              </View>
              <Pressable
                style={styles.modalButton}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setComplete(true);
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
  color: (opacity = 1) => `black`,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalButton: {
    width: 55,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#9CB96A',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 15,
    textAlign: 'center',
  },
  modalInputContainer: { alignSelf: 'flex-start' },
  modalInput: {
    marginBottom: 15,
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
  },
  growProfile: {
    flexDirection: 'row',
    marginTop: 40,
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
    marginLeft: -10,
    marginBottom: 10,
  },
});

export default MyPage;
