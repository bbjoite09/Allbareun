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
import { setUserData, setUserId, setUserType } from '../redux/modules/userInfo';
import { service } from '../services';
import { axiosSrc } from '../static/url/axiosSrc';
import LoadingButton from '../elements/LoadingButton';

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const SignIn = ({ navigation }: Props) => {
  const [inputs, setInputs] = useState<any>({ id: '', pw: '' });
  const [isLoading, setLoading] = useState<boolean>(false);
  // const [isNew, setNew] = useState<any>();
  const dispatch = useDispatch();

  const setUserInfo = async (id: string) => {
    const userInfo = await service.health.getBodyData(axiosSrc.health + id);
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

    if (userInfoData.bodyinfo.length == 0) {
      return { new: true };
    } else {
      return { new: false };
    }
  };

  const handleOnSignIn = async () => {
    const res = await service.user.signIn(inputs.id, inputs.pw);
    dispatch(setUserType(res.user_type));

    if (res.loginSuccess && res.pairing) {
      // 어린이 - 보호자 유형 구분 후 네비게이션 이동
      if (res.user_type == 'parent') {
        dispatch(setUserId(inputs.id, res.partner));
        setUserInfo(res.partner).then(res => {
          setLoading(false);
          if (res.new) {
            navigation.navigate('BodyData');
          } else {
            navigation.reset({ routes: [{ name: 'ParentTab' }] });
          }
        });
      } else {
        dispatch(setUserId(res.partner, inputs.id));
        setUserInfo(inputs.id).then(res => {
          setLoading(false);
          if (res.new) {
            navigation.navigate('BodyData');
          } else {
            navigation.reset({ routes: [{ name: 'ChildTab' }] });
          }
        });
      }
    } else if (res.loginSuccess && !res.paring) {
      setLoading(false);
      navigation.navigate('Pairing');
    } else {
      setLoading(false);
      Alert.alert('로그인 실패', res.message ? res.message : null);
    }
  };

  const handleEnterEvent = () => {
    setLoading(true);
    if (inputs.id && inputs.pw) {
      handleOnSignIn();
    } else {
      setLoading(false);
      Alert.alert('경고', '모든 값을 입력해주세요');
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: 'white', height: '100%' }}>
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
        {isLoading ? (
          <LoadingButton
            containerStyle={{
              marginBottom: 15,
              bottom: -20,
              left: Dimensions.get('window').width / 2 - 124,
            }}
          />
        ) : (
          <Pressable
            style={[
              styles.selectButton,
              {
                marginBottom: 15,
                bottom: -20,
                left: Dimensions.get('window').width / 2 - 124,
              },
            ]}
            onPress={() => {
              setLoading(true);
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
        )}
        <Pressable
          style={[
            styles.selectButton,
            {
              marginBottom: 30,
              left: Dimensions.get('window').width / 2 - 124,
              bottom: -90,
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
    width: Dimensions.get('window').width,
    height: 115,
  },
  container: {
    display: 'flex',
    height: '50%',
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
