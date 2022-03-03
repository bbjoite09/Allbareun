import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import Typography from '../Components/Typography';

const { width } = Dimensions.get('screen');

const MyPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../Assets/logoTopDetail.png')}
        style={styles.logoStyle}
      />
      {/* 어린이 프로필 정보 */}
      <View style={styles.profileContainer}>
        <Image
          source={require('../Assets/MyPage/profileImg.jpeg')}
          style={styles.profileImage}
        />
        <View style={styles.profileText}>
          <Typography value="최시준 어린이" type="subtitle" />
          <Typography
            value="나이 : 11세"
            type="subtitle"
            textStyle={{ textAlign: 'left', paddingTop: 10 }}
          />
        </View>
      </View>

      {/* 키, 몸무게 그래프 */}
      <View style={styles.growProfile}>
        <Typography value="서준이의 키와 몸무게" type="subtitle" />
        <Pressable style={styles.addGrowButton}>
          <Typography
            value="+"
            type="subtitle"
            textStyle={{ color: 'white' }}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  logoStyle: {
    width: width,
    height: 105,
    marginBottom: 50,
  },
  profileContainer: {
    flexDirection: 'row',
    width: width - 45,
    borderColor: '#E4E4E4',
    borderWidth: 2,
    borderRadius: 20,
    height: 112,
    alignItems: 'center',
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: '#000000', //그림자색
        shadowOpacity: 0.3, //그림자 투명도
        shadowOffset: { width: 2, height: 2 },
      },
      android: {
        elevation: 3,
      },
    }),
  },
  profileImage: {
    width: 95,
    height: 95,
    marginLeft: 10,
    borderColor: 'white',
    borderWidth: 10,
  },
  profileText: {
    marginTop: 20,
    marginLeft: 15,
    alignSelf: 'flex-start',
  },
  growProfile: {
    flexDirection: 'row',
    marginTop: 50,
    marginLeft: 30,
    alignSelf: 'flex-start',
  },
  addGrowButton: {
    width: 25,
    height: 25,
    marginLeft: 10,
    backgroundColor: '#9CB96A',
    borderRadius: 15,
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000000', //그림자색
        shadowOpacity: 0.3, //그림자 투명도
        shadowOffset: { width: 2, height: 2 },
      },
      android: {
        elevation: 3,
      },
    }),
  },
});

export default MyPage;
