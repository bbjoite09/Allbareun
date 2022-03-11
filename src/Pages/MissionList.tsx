import React from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet } from 'react-native';
import { Agenda, Calendar, CalendarList } from 'react-native-calendars';
import Typography from '../Components/Typography';

const Report = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../Assets/logoTop.png')}
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
        maxDate={'2022-12-31'}
        onDayPress={day => {
          console.log('selected day', day);
        }}
        monthFormat={'yyyy년 MM월'}
        onMonthChange={month => {
          console.log('month changed', month);
        }}
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
    marginBottom: 15,
    color: '#3F3F3F',
  },
  container: {
    flex: 1,
  },
  logoStyle: {
    width: Dimensions.get('window').width,
    height: 105,
    marginBottom: 50,
  },
});

export default Report;
