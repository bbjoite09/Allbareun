import React, { useEffect, useState } from 'react';
import {
  VictoryPolarAxis,
  VictoryChart,
  VictoryArea,
  VictoryGroup,
  VictoryLabel,
} from 'victory-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { service } from '../../services';
import { axiosSrc } from '../../static/url/axiosSrc';

const RadarChart = () => {
  const { user } = useSelector((state: RootState) => state);
  const [chartData, setChartData] = useState();

  const getMaxima = data => {
    const groupedData = Object.keys(data[0]).reduce((memo, key) => {
      memo[key] = data.map(d => d[key]);
      return memo;
    }, {});
    return Object.keys(groupedData).reduce((memo, key) => {
      memo[key] = Math.max(...groupedData[key]);
      return memo;
    }, {});
  };

  const processData = data => {
    const maxByGroup = getMaxima(data);
    const makeDataArray = d => {
      return Object.keys(d).map(key => {
        return { x: key, y: d[key] / maxByGroup[key] };
      });
    };
    return data.map(datum => makeDataArray(datum));
  };

  const getNutriData = async () => {
    const nutriData = await service.food.getReport(
      axiosSrc.report + user.childId,
    );
    const nutriDataDoc = nutriData.doc;

    const data = {
      탄수화물: nutriDataDoc.carbon_score,
      지방: nutriDataDoc.fat_score,
      나트륨: nutriDataDoc.salt_score,
      칼슘: nutriDataDoc.calcium_score,
      비타민: nutriDataDoc.vitamin_C_score,
      단백질: nutriDataDoc.protein_score,
    };

    setChartData(data);
  };

  useEffect(() => {
    getNutriData();
    console.log(chartData);
  }, []);

  const characterData = [
    {
      탄수화물: 100,
      지방: 100,
      나트륨: 100,
      칼슘: 100,
      비타민: 100,
      단백질: 100,
    },
    typeof chartData != 'undefined'
      ? chartData
      : {
          탄수화물: 2,
          지방: 250,
          나트륨: 10,
          칼슘: 60,
          비타민: 50,
          단백질: 70,
        },
  ];

  const data = processData(characterData);
  const maxima = getMaxima(characterData);

  return typeof chartData != 'undefined' ? (
    <VictoryChart polar domain={{ y: [0, 1] }}>
      <VictoryGroup
        colorScale={['#E4E4E4', '#9CB96A']}
        style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}>
        {data.map((data, i) => {
          return <VictoryArea key={i} data={data} />;
        })}
      </VictoryGroup>
      {Object.keys(maxima).map((key, i) => {
        return (
          <VictoryPolarAxis
            key={i}
            dependentAxis
            style={{
              axisLabel: { padding: 10 },
              axis: { stroke: 'none' },
              grid: { stroke: 'grey', strokeWidth: 0.25, opacity: 0.5 },
            }}
            tickLabelComponent={<VictoryLabel labelPlacement="vertical" />}
            labelPlacement="perpendicular"
            axisValue={i + 1}
            label={key}
            tickFormat={t => Math.ceil(t * maxima[key])}
            tickValues={[0.25, 0.5, 0.75]}
          />
        );
      })}
      <VictoryPolarAxis
        labelPlacement="parallel"
        tickFormat={() => ''}
        style={{
          axis: { stroke: 'none' },
          grid: { stroke: 'grey', opacity: 0.5 },
        }}
      />
    </VictoryChart>
  ) : null;
};

export default RadarChart;
