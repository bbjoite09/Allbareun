import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RadioForm from 'react-native-simple-radio-button';
import { RootStackParamList } from '../../App';
import Typography from '../elements/Typography';
import { service } from '../services';
import { axiosSrc } from '../static/url/axiosSrc';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const SignUp = ({ navigation }: Props) => {
  const typeProps = [
    { label: '보호자    ', value: 0 },
    { label: '어린이', value: 1 },
  ];
  const sexProps = [
    { label: '여성    ', value: 0 },
    { label: '남성      ', value: 1 },
  ];
  const [inputs, setInputs] = useState<any>({
    id: '',
    pw: '',
    sex: 'F',
    name: '',
    type: 'parent',
  });

  const handleInput = (title: string, placeholder: string, key: string) => {
    return (
      <View style={[styles.rowContainer, { marginBottom: '3%' }]}>
        <Typography
          value={title}
          type="subtitle"
          containerStyle={{
            width: '30%',
            height: 50,
            backgroundColor: '#8CC751',
          }}
          textStyle={{ lineHeight: 50, color: 'white' }}
        />
        <TextInput
          placeholder={placeholder + '을(를) 입력해주세요.'}
          style={styles.inputText}
          onChangeText={e => setInputs({ ...inputs, [key]: e })}
        />
      </View>
    );
  };

  const handleRadio = (
    title: string,
    props: any,
    key: string,
    value1: string,
    value2: string,
  ) => {
    return (
      <View
        style={[
          styles.rowContainer,
          {
            marginBottom: '3%',
            justifyContent: 'space-between',
          },
        ]}>
        <Typography
          value={title}
          type="subtitle"
          containerStyle={{
            backgroundColor: '#8CC751',
            width: '30%',
            height: 50,
          }}
          textStyle={{ lineHeight: 50, color: 'white' }}
        />
        <RadioForm
          radio_props={props}
          formHorizontal={true}
          initial={0}
          buttonColor={'#8CC751'}
          selectedButtonColor={'#8CC751'}
          onPress={value => {
            if (value == 0) {
              setInputs({ ...inputs, [key]: value1 });
            } else {
              setInputs({ ...inputs, [key]: value2 });
            }
          }}
          style={{ paddingRight: 40 }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView>
      <Image
        source={require('../static/images/logoTop.png')}
        style={styles.logoStyle}
      />
      <View style={styles.container}>
        <Typography value="회원가입" type="title" />
        <View>
          {handleInput('아이디', '아이디', 'id')}
          {handleInput('비밀번호', '비밀번호', 'pw')}
          {handleInput('이름', '이름', 'name')}
          {handleRadio('성별', sexProps, 'sex', 'F', 'M')}
          {handleRadio('가입유형', typeProps, 'type', 'parent', 'child')}
        </View>
        <Pressable
          style={[styles.selectButton, { marginBottom: 30 }]}
          onPress={async () => {
            const res = await service.user.signUp(
              inputs.id,
              inputs.pw,
              inputs.name,
              inputs.type,
              inputs.sex,
            );
            if (res.success) {
              navigation.navigate('SignIn');
            } else {
              Alert.alert('회원가입 실패!', '잠시후 다시 시도해 주세요.');
            }
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
    height: 105,
  },
  container: {
    display: 'flex',
    height: '75%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8CC751',
  },
  inputText: {
    width: '60%',
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
  },
});
export default SignUp;
