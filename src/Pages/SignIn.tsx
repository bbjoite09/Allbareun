import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { Text } from 'react-native-svg';
import { RootStackParamList } from '../../App';
import Typography from '../Components/Typography';

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const SignIn = ({ navigation }: Props) => {
  const [inputs, setInputs] = useState<any>({ id: '', pw: '' });

  return (
    <SafeAreaView>
      <Image
        source={require('../Assets/logoTop.png')}
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
              autoFocus={true}
              style={styles.inputText}
              onChangeText={e => setInputs({ ...inputs, ['id']: e })}
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
              style={styles.inputText}
              onChangeText={e => setInputs({ ...inputs, ['pw']: e })}
            />
          </View>
        </View>
        <View>
          <Pressable
            style={[styles.selectButton, { marginBottom: 10 }]}
            onPress={() => {
              navigation.navigate('MyTabs');
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
    width: '50%',
    height: 50,
    fontSize: 18,
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

export default SignIn;
