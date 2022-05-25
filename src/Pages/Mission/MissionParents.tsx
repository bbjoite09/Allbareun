import React, { useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Modal,
  Text,
  Alert,
  TextInput,
} from 'react-native';
import Typography from '../../Components/Typography';

const { width } = Dimensions.get('screen');

const MissionParents = () => {
  const [isSelect, setSelect] = useState<any>({
    id1: false,
    id2: false,
    id3: false,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const addFood = useRef();

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

  const getModal = () => {
    const [text, setText] = useState('');
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
              onChangeText={newText => setText(newText)}
              defaultValue={text}
            />
            <ScrollView style={{ width: '100%' }}>
              <View style={styles.modalList}>
                <Text style={styles.modalText}>test1</Text>
              </View>
            </ScrollView>
            <View style={{}}>
              <Pressable
                style={styles.selectButton}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.moddalButtonText}>추가하기</Text>
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
        source={require('../../Assets/logoTop.png')}
        style={styles.logoStyle}
      />
      <Typography
        value="오늘의 미션"
        type="title"
        containerStyle={{ marginBottom: 20 }}
      />
      <ScrollView>
        <View style={{ flexDirection: 'column' }}>
          {handleMission('id1', '오이 먹기')}
          {handleMission('id2', '고등어 조림 먹기')}
          {handleMission('id3', '오렌지 반개 먹기')}
        </View>
        <View style={{ flexDirection: 'column' }}>
          {getModal()}
          <Pressable
            style={[styles.missionContainer, { backgroundColor: '#D9D9D9' }]}
            onPress={() => setModalVisible(true)}>
            <Image
              source={require('../../Assets/Mission/plus.png')}
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
    justifyContent: 'center',
    alignItems: 'flex-start',
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
