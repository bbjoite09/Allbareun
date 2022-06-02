import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { RootStackParamList } from '../../App';
import Typography from '../elements/Typography';
import { service } from '../services';

type Props = NativeStackScreenProps<RootStackParamList, 'Pairing'>;

const Pairing = ({ navigation }: Props) => {
  const [inputs, setInputs] = useState<any>({
    id: '',
  });

  const handleOnPress = async () => {
    const res = await service.user.pairing(inputs.id);
    if (res.success) {
      if (res.user_type == 'parent') {
        navigation.navigate('ParentTab');
      } else {
        navigation.navigate('ChildTab');
      }
    } else {
      Alert.alert('페어링 실패', res.message ? res.message : null);
    }
  };
  const handleEnterEvent = () => {
    if (inputs.id) {
      handleOnPress();
    } else {
      Alert.alert('경고', '모든 값을 입력해주세요');
    }
  };

  return (
    <SafeAreaView>
      <Pressable
        onPress={() => {
          navigation.navigate('SignIn');
        }}>
        <Image
          source={require('../static/images/logoTop.png')}
          style={styles.logoStyle}
        />
      </Pressable>
      <View style={styles.container}>
        <Typography
          value="보호자 - 자녀 계정 연동"
          type="title"
          containerStyle={{ marginTop: Platform.OS == 'ios' ? '15%' : '10%' }}
        />
        <View>
          <View
            style={[
              styles.rowContainer,
              {
                borderWidth: 0,
                alignItems: 'flex-start',
                marginTop: Platform.OS == 'ios' ? '15%' : '10%',
              },
            ]}>
            <Typography
              value={'⭐️ '}
              type="subtitle"
              containerStyle={{ marginRight: 10 }}
            />
            <Typography
              value={'계정 연동을 위해 상대방의 아이디를 입력\n해주세요.'}
              type="subtitle"
              containerStyle={{ marginBottom: '10%' }}
              textStyle={{ textAlign: 'left' }}
            />
          </View>
          <View style={styles.rowContainer}>
            <Typography
              value={'아이디'}
              type="subtitle"
              containerStyle={{
                width: '30%',
                height: 50,
                backgroundColor: '#8CC751',
              }}
              textStyle={{ lineHeight: 50, color: 'white' }}
            />
            <TextInput
              placeholder={'아이디를 입력해주세요.'}
              style={styles.inputText}
              autoCapitalize="none"
              onChangeText={e => setInputs({ ...inputs, ['id']: e })}
              onSubmitEditing={() => handleEnterEvent()}
            />
          </View>
        </View>
        <Pressable
          style={styles.selectButton}
          onPress={async () => handleOnPress()}>
          <Typography
            value="계정 연동하기"
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
    height: '80%',
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
    bottom: 0,
  },
});
export default Pairing;
