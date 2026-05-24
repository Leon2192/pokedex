import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartPanel } from './PokemonStatsChart.styled';

const PokemonStatsChart = ({ chartData }) => (
  <ChartPanel data-testid="pokemon-stats-chart">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 4, right: 36, bottom: 4, left: 24 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" domain={[0, 160]} tickLine={false} />
        <YAxis dataKey="name" type="category" tickLine={false} width={116} />
        <Tooltip />
        <Bar dataKey="value" fill="#2563eb" radius={[0, 6, 6, 0]}>
          <LabelList dataKey="value" position="right" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </ChartPanel>
);

export default React.memo(PokemonStatsChart);
