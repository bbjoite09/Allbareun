import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { RootStackParamList } from '../../../App';
import Typography from '../../elements/Typography';

type Props = NativeStackScreenProps<RootStackParamList, 'MissionList'>;
const MissionList = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../static/images/logoTop.png')}
        style={styles.logoStyle}
      />
      <Typography
        value="수행한 미션 리스트 🗒"
        type="subtitle"
        textStyle={styles.titleStyle}
      />
      <Calendar
        current={Date()}
        minDate={'2022-01-01'}
        maxDate={Date()}
        onDayPress={day => {
          navigation.navigate('MissionListDetail', { day });
        }}
        monthFormat={'yyyy년 MM월'}
        hideExtraDays={true}
        firstDay={1}
        hideDayNames={false}
        onPressArrowLeft={substractMonth => substractMonth()}
        onPressArrowRight={addMonth => addMonth()}
        disableAllTouchEventsForDisabledDays={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 20,
    color: '#3F3F3F',
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  logoStyle: {
    width: Dimensions.get('window').width,
    height: 115,
    marginBottom: 50,
  },
});

export default MissionList;
