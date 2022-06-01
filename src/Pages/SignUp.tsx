import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RadioForm from 'react-native-simple-radio-button';
import { RootStackParamList } from '../../App';
import Typography from '../Components/Typography';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const SignUp = ({ navigation }: Props) => {
  const radioProps = [
    { label: '보호자    ', value: 0 },
    { label: '어린이', value: 1 },
  ];
  const [inputs, setInputs] = useState<any>({
    id: '',
    pw: '',
    name: '',
    age: '',
    type: 'parents',
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

  const handleRadio = (title: string, key: string) => {
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
          radio_props={radioProps}
          formHorizontal={true}
          initial={0}
          buttonColor={'#8CC751'}
          selectedButtonColor={'#8CC751'}
          onPress={value => {
            if (value == 0) {
              setInputs({ ...inputs, [key]: 'parent' });
            } else {
              setInputs({ ...inputs, [key]: 'child' });
            }
          }}
          style={{ paddingRight: 40 }}
        />
      </View>
    );
  };

  console.log(inputs);

  return (
    <SafeAreaView>
      <Image
        source={require('../Assets/logoTop.png')}
        style={styles.logoStyle}
      />
      <View style={styles.container}>
        <Typography value="회원가입" type="title" />
        <View>
          {handleInput('아이디', '아이디', 'id')}
          {handleInput('비밀번호', '비밀번호', 'pw')}
          {handleInput('이름', '이름', 'name')}
          {handleInput('나이', '나이', 'age')}
          {handleRadio('가입유형', 'type')}
        </View>
        <Pressable
          style={[styles.selectButton, { marginBottom: 30 }]}
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
