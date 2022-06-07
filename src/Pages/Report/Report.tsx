import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useSelector } from 'react-redux';
import Typography from '../../elements/Typography';
import { RootState } from '../../redux/store';
import { service } from '../../services';
import { axiosSrc } from '../../static/url/axiosSrc';
import RadarChart from './RadarChart';

const { width } = Dimensions.get('window');

const Report = () => {
  const dateList = [2021.01, 2022.02, 2022.03, 2022.04, 2022.05];
  // const [dateList, setDateList] = useState();
  // const [acheiveCountList, setAcheiveCountList] = useState();
  const [countData, setCountData] = useState<any>();
  const acheiveCountList = [
    10,
    6,
    8,
    7,
    typeof countData != 'undefined' ? countData.doneMission : 0,
  ];

  const data = {
    labels: dateList,
    datasets: [
      {
        data: acheiveCountList,
        strokeWidth: 2,
      },
    ],
  };
  const { user } = useSelector((state: RootState) => state);
  const axiosUrl = axiosSrc.getMonthMissionCount + user.childId;

  const getCount = async () => {
    const count = await service.mission.getMonthMissionCount(axiosUrl);
    setCountData(count);
  };

  useEffect(() => {
    getCount();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../static/images/logoTopDetail.png')}
        style={styles.logoStyle}
      />
      <ScrollView>
        <Typography
          value={`평균 미션 수행률 (총 ${
            typeof countData != 'undefined' ? countData.AllMission : 0
          }회)`}
          type="subtitle"
          containerStyle={styles.textStyle}
        />
        <View style={styles.nutriScoreGraphContainer}>
          <View
            style={[
              styles.nutriScoreGraph,
              {
                width:
                  typeof countData != 'undefined'
                    ? (width - 50) * (countData.performance_rate / 100)
                    : 0,
              },
            ]}>
            <Typography
              type="subtitle"
              value={
                typeof countData != 'undefined'
                  ? countData.doneMission + '회'
                  : 0 + '회'
              }
              textStyle={{ lineHeight: 35, fontSize: 16, color: 'white' }}
            />
          </View>
        </View>
        <View style={styles.nutriScoreTextContainer}>
          <Typography value="낮음" textStyle={styles.nutriScoreText} />
          <Typography value="적정" textStyle={styles.nutriScoreText} />
          <Typography value="권장" textStyle={styles.nutriScoreText} />
          <Typography value="초과" textStyle={styles.nutriScoreText} />
        </View>
        <Typography
          value="평균 미션 성공 횟수"
          type="subtitle"
          containerStyle={[
            styles.textStyle,
            { marginTop: 50, marginBottom: 20 },
          ]}
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
          value={`저번 달보다 미션 성공률이 줄어들어 ${
            typeof countData != 'undefined' ? countData.doneMission : 0
          }개의 미션을 수행하셨습니다. 다음 달에는 새로운 신기록에 도전해보세요!`}
          textStyle={{ textAlign: 'left', padding: 25 }}
        />
        <Typography
          value="섭취한 영양소 그래프"
          type="subtitle"
          containerStyle={[
            styles.textStyle,
            { marginTop: 30, marginBottom: 20 },
          ]}
        />
        <RadarChart />
        <Typography
          value="이번 한달간 탄수화물, 지방의 섭취량은 표준이상이며, 단백질, 나트륨의 섭취량은 표준 이하입니다."
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
    marginTop: 30,
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
