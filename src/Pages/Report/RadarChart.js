import React from 'react';
import {
  VictoryPolarAxis,
  VictoryChart,
  VictoryArea,
  VictoryGroup,
  VictoryLabel,
} from 'victory-native';

const characterData = [
  { 탄수화물: 1, 지방: 125, 나트륨: 1, 칼슘: 40, 비타민: 90, 단백질: 70 },
  { 탄수화물: 2, 지방: 250, 나트륨: 10, 칼슘: 60, 비타민: 50, 단백질: 70 },
];

export default class RadarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.processData(characterData),
      maxima: this.getMaxima(characterData),
    };
  }

  getMaxima(data) {
    const groupedData = Object.keys(data[0]).reduce((memo, key) => {
      memo[key] = data.map(d => d[key]);
      return memo;
    }, {});
    return Object.keys(groupedData).reduce((memo, key) => {
      memo[key] = Math.max(...groupedData[key]);
      return memo;
    }, {});
  }

  processData(data) {
    const maxByGroup = this.getMaxima(data);
    const makeDataArray = d => {
      return Object.keys(d).map(key => {
        return { x: key, y: d[key] / maxByGroup[key] };
      });
    };
    return data.map(datum => makeDataArray(datum));
  }

  render() {
    return (
      <VictoryChart polar domain={{ y: [0, 1] }}>
        <VictoryGroup
          colorScale={['gray', '#9CB96A']}
          style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}>
          {this.state.data.map((data, i) => {
            return <VictoryArea key={i} data={data} />;
          })}
        </VictoryGroup>
        {Object.keys(this.state.maxima).map((key, i) => {
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
              tickFormat={t => Math.ceil(t * this.state.maxima[key])}
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
    );
  }
}
