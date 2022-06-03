import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { RootStackParamList } from '../../App';
import Typography from '../elements/Typography';
import { setUserData, setUserId } from '../redux/modules/userInfo';
import { service } from '../services';
import { axiosSrc } from '../static/url/axiosSrc';

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const SignIn = ({ navigation }: Props) => {
  const [inputs, setInputs] = useState<any>({ id: '', pw: '' });
  const dispatch = useDispatch();

  const setUserInfo = async (id: string) => {
    const userInfo = await service.health.getBodyData(
      axiosSrc.health + '/' + id,
    );
    const userInfoData = userInfo.data;

    dispatch(
      setUserData(
        userInfoData.user.name,
        userInfoData.user.user_sex,
        userInfoData.bodyinfo.length == 0 ? '❌' : userInfoData.bodyinfo[0].bmi,
      ),
    );
    dispatch(setUserId(inputs.id));
  };

  const handleOnSignIn = async () => {
    const res = await service.user.signIn(inputs.id, inputs.pw);
    if (res.loginSuccess && res.pairing) {
      // 어린이 - 보호자 유형 구분 후 네비게이션 이동
      if (res.user_type == 'parent') {
        setUserInfo(res.partner);
        navigation.navigate('ParentTab');
      } else {
        setUserInfo(inputs.id);
        navigation.navigate('ChildTab');
      }
    } else if (res.loginSuccess && !res.paring) {
      dispatch(setUserId(inputs.id));
      navigation.navigate('Pairing');
    } else {
      Alert.alert('로그인 실패', res.message ? res.message : null);
    }
  };

  const handleEnterEvent = () => {
    if (inputs.id && inputs.pw) {
      handleOnSignIn();
    } else {
      Alert.alert('경고', '모든 값을 입력해주세요');
    }
  };

  return (
    <SafeAreaView>
      <Image
        source={require('../static/images/logoTop.png')}
        style={styles.logoStyle}
      />
      <View style={styles.container}>
        <Typography value="로그인" type="title" />
        <View>
          <View style={[styles.rowContainer, { marginBottom: '5%' }]}>
            <Typography
              value="아이디"
              type="subtitle"
              containerStyle={{
                backgroundColor: '#8CC751',
                width: '30%',
                height: 50,
              }}
              textStyle={{ lineHeight: 50, color: 'white' }}
            />
            <TextInput
              placeholder="아이디를 입력해주세요"
              autoCapitalize="none"
              autoFocus={true}
              style={styles.inputText}
              onChangeText={e => setInputs({ ...inputs, ['id']: e })}
              onSubmitEditing={() => handleEnterEvent()}
            />
          </View>
          <View style={styles.rowContainer}>
            <Typography
              value="비밀번호"
              type="subtitle"
              containerStyle={{
                backgroundColor: '#8CC751',
                width: '30%',
                height: 50,
              }}
              textStyle={{ lineHeight: 50, color: 'white' }}
            />
            <TextInput
              placeholder="비밀번호를 입력해주세요"
              autoCapitalize="none"
              secureTextEntry={true}
              style={styles.inputText}
              textContentType={'password'}
              onChangeText={e => setInputs({ ...inputs, ['pw']: e })}
              onSubmitEditing={() => handleEnterEvent()}
            />
          </View>
        </View>
      </View>
      <View style={{ height: '10%' }}>
        <Pressable
          style={[
            styles.selectButton,
            {
              marginBottom: 15,
              bottom: -50,
              left: Dimensions.get('window').width / 2 - 124,
            },
          ]}
          onPress={() => {
            handleOnSignIn();
          }}>
          <Typography
            value="로그인하기"
            type="title"
            textStyle={{
              textDecorationLine: 'none',
              color: 'white',
              fontSize: 20,
            }}
          />
        </Pressable>
        <Pressable
          style={[
            styles.selectButton,
            {
              marginBottom: 30,
              left: Dimensions.get('window').width / 2 - 124,
              bottom: -120,
            },
          ]}
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          <Typography
            value="회원가입하기"
            type="title"
            textStyle={{
              textDecorationLine: 'none',
              color: 'white',
              fontSize: 20,
            }}
          />
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
  container: {
    display: 'flex',
    height: '60%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'relative',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8CC751',
  },
  inputText: {
    width: '55%',
    height: 50,
    fontSize: 15,
    paddingLeft: '5%',
  },
  selectButton: {
    width: 248,
    height: 41,
    backgroundColor: '#8CC751',
    borderRadius: 10,
    justifyContent: 'center',
    position: 'absolute',
  },
});

export default SignIn;
