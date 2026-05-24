import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartPanel, ChartTitle, ChartWrap } from './PokemonComparisonChart.styled';

const tooltipLabelFormatter = (_label, payload) => payload?.[0]?.payload?.fullStatName ?? _label;

const PokemonComparisonChart = ({ chartData, chartSeries }) => (
  <ChartPanel data-testid="pokemon-comparison-chart">
    <ChartTitle>Comparacion de stats</ChartTitle>
    <ChartWrap>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 18, right: 18, bottom: 8, left: -12 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="stat" tickLine={false} interval={0} />
          <YAxis allowDecimals={false} domain={[0, 160]} tickLine={false} width={42} />
          <Tooltip labelFormatter={tooltipLabelFormatter} />
          <Legend />
          {chartSeries.map((serie) => (
            <Line
              key={serie.dataKey}
              dataKey={serie.dataKey}
              name={serie.name}
              stroke={serie.color}
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6 }}
              type="monotone"
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartWrap>
  </ChartPanel>
);

export default React.memo(PokemonComparisonChart);
