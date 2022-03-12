import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Typography from '../Components/Typography';

const { width } = Dimensions.get('window');

const Report = () => {
  const dateList = [2021.12, 2022.01, 2022.02, 2022.03];
  const acheiveCountList = [150, 130, 100, 140];
  const data = {
    labels: dateList,
    datasets: [
      {
        data: acheiveCountList,
        color: () => `#9CB96A`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../Assets/logoTopDetail.png')}
        style={styles.logoStyle}
      />
      <ScrollView>
        <Typography
          value="영양 섭취 점수(평균 2731kcal)"
          type="subtitle"
          containerStyle={styles.textStyle}
        />
        <View style={styles.nutriScoreGraphContainer}>
          <View style={styles.nutriScoreGraph} />
        </View>
        <View style={styles.nutriScoreTextContainer}>
          <Typography value="낮음" textStyle={styles.nutriScoreText} />
          <Typography value="적정" textStyle={styles.nutriScoreText} />
          <Typography value="권장" textStyle={styles.nutriScoreText} />
          <Typography value="초과" textStyle={styles.nutriScoreText} />
        </View>

        <Typography
          value="이번 한달간 탄수화물, 지방의 섭취량은 표준이상이며, 단백질, 나트륨의 섭취량은 표준 이하입니다."
          textStyle={{ textAlign: 'left', padding: 25 }}
        />
        <Typography
          value="미션 지속 시간"
          type="subtitle"
          containerStyle={styles.textStyle}
        />
        <LineChart
          data={data}
          width={width - 45}
          height={170}
          chartConfig={chartConfig}
          withVerticalLines={false}
          fromZero={true}
          style={styles.chartContainer}
        />
        <Typography
          value="저번 달보다 미션 지속 시간이 증가하여 3시간 동안 미션을 수행하셨습니다. 다음 달에는 새로운 신기록을 도전해보세요!"
          textStyle={{ textAlign: 'left', padding: 25 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const chartConfig = {
  backgroundGradientFrom: 'white',
  backgroundGradientTo: 'white',
  color: () => `#333333`,
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoStyle: {
    width: width,
    height: 105,
  },
  textStyle: {
    marginTop: 20,
  },
  nutriScoreGraphContainer: {
    marginTop: 10,
    height: 35,
    width: width - 50,
    backgroundColor: '#dcdcdc',
    alignSelf: 'center',
  },
  nutriScoreGraph: {
    height: 35,
    width: (width - 50) / 2,
    backgroundColor: '#9CB96A',
    alignSelf: 'flex-start',
  },
  nutriScoreTextContainer: {
    marginTop: 10,
    width: width - 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  nutriScoreText: {
    fontWeight: '700',
  },
  chartContainer: {
    marginTop: 10,
    alignSelf: 'center',
  },
});
export default Report;
