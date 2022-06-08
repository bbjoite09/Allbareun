import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from '../../App';
import Typography from '../elements/Typography';
import { setUserData } from '../redux/modules/userInfo';
import { service } from '../services';
import { axiosSrc } from '../static/url/axiosSrc';

type Props = NativeStackScreenProps<RootStackParamList, 'BodyData'>;
const BodyData = ({ navigation }: Props) => {
  const [inputs, setInputs] = useState<any>({
    height: 0,
    weight: 0,
    age: 0,
    activeKcal: 0,
  });
  const { user } = useSelector((state: RootState) => state);
  const axiosUrl = axiosSrc.health + user.childId;
  const dispatch = useDispatch();

  const handleInput = (title: string, key: string, autoFocuse?: boolean) => {
    return (
      <View style={[styles.rowContainer, { marginBottom: '5%' }]}>
        <Typography
          value={title}
          type="subtitle"
          containerStyle={{
            width: '30%',
            height: 55,
            backgroundColor: '#8CC751',
          }}
          textStyle={{ lineHeight: 55, color: 'white' }}
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
            } else {
              Alert.alert('경고', '모든 값을 입력해주세요');
            }
          }}
        />
      </View>
    );
  };
  const handleEnroll = async () => {
    if (
      inputs.height != 0 &&
      inputs.weight != 0 &&
      inputs.age != 0 &&
      inputs.activeKcal != 0
    ) {
      await service.health.setBodyData(
        inputs.weight,
        inputs.height,
        inputs.age,
        inputs.activeKcal,
        axiosUrl,
      );

      const userInfo = await service.health.getBodyData(
        axiosSrc.health + user.childId,
      );
      const userInfoData = userInfo.data;

      dispatch(
        setUserData(
          userInfoData.user.name,
          userInfoData.user.user_sex,
          userInfoData.bodyinfo.length == 0
            ? '❌'
            : userInfoData.bodyinfo[0].bmi,
          userInfoData.bodyinfo.length == 0
            ? 1550
            : userInfoData.bodyinfo[userInfoData.bodyinfo.length - 1].user_kcal,
        ),
      );
      setInputs({ height: 0, weight: 0, age: 0, activeKcal: 0 });
      if (user.userType == 'parent') {
        navigation.navigate('ParentTab');
      } else if (user.userType == 'child') {
        navigation.navigate('ChildTab');
      }
    } else {
      Alert.alert('경고', '모든 값을 입력해주세요.');
    }
  };

  return (
    <SafeAreaView style={styles.centerContainer}>
      <View style={styles.inputContainer}>
        <Typography
          type="subtitle"
          value="환영합니다 🥳"
          textStyle={[
            styles.modalText,
            { marginBottom: 15, marginTop: '-10%' },
          ]}
        />
        <Typography
          type="subtitle"
          value="어린이 정보를 입력해주세요."
          textStyle={styles.modalText}
        />
        <View style={styles.modalInputContainer}>
          {handleInput('키', 'height', true)}
          {handleInput('몸무게', 'weight')}
          {handleInput('나이', 'age')}
          {handleInput('활동량', 'activeKcal')}
        </View>
        <Pressable
          style={styles.roundButton}
          onPress={async () => {
            handleEnroll();
          }}>
          <Text style={styles.textStyle}>등록</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoStyle: {
    width: '100%',
    height: 110,
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
    height: 55,
    fontSize: 15,
    paddingLeft: '5%',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  inputContainer: {
    width: '80%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  roundButton: {
    width: 200,
    height: 50,
    borderRadius: 60,
    justifyContent: 'center',
    padding: 10,
    elevation: 2,
    backgroundColor: '#8CC751',
    marginTop: 50,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  modalText: {
    marginBottom: 60,
    fontSize: 23,
    textAlign: 'left',
  },
  modalInputContainer: { alignSelf: 'flex-start' },
  modalInput: {
    marginBottom: 20,
    fontSize: 16,
    lineHeight: 16,
  },
});
export default BodyData;
