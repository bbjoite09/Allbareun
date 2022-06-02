import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import Typography from '../../elements/Typography';
import RadarChart from './RadarChart';

const { width } = Dimensions.get('window');

const Report = () => {
  const dateList = [2021.12, 2022.01, 2022.02, 2022.03, 2022.04];
  const acheiveCountList = [20, 15, 13, 17, 25];
  const data = {
    labels: dateList,
    datasets: [
      {
        data: acheiveCountList,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../static/images/logoTopDetail.png')}
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
        <RadarChart />
        <Typography
          value="이번 한달간 탄수화물, 지방의 섭취량은 표준이상이며, 단백질, 나트륨의 섭취량은 표준 이하입니다."
          textStyle={{ textAlign: 'left', padding: 25 }}
        />
        <Typography
          value="날짜별 미션 성공률"
          type="subtitle"
          containerStyle={styles.textStyle}
        />
        <BarChart
          data={data}
          width={width - 10}
          height={170}
          withInnerLines={false}
          chartConfig={chartConfig}
          withVerticalLines={false}
          fromZero={true}
          style={styles.chartContainer}
        />
        <Typography
          value={`저번 달보다 미션 성공률이 줄어들어 ${acheiveCountList[4]}개의 미션을 수행하셨습니다. 다음 달에는 새로운 신기록을 도전해보세요!`}
          textStyle={{ textAlign: 'left', padding: 25 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const chartConfig = {
  backgroundGradientFrom: 'white',
  backgroundGradientTo: 'white',
  decimalPlaces: 0,
  color: () => `#488F00`,
  labelColor: () => `rgba(0, 0, 0, 1)`,
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  logoStyle: {
    width: width,
    height: 75,
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
    width: (width - 50) * 0.8,
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
    alignItems: 'center',
  },
});
export default Report;
