import { useMemo } from 'react';
import { buildComparisonChartData } from '@/helpers/pokemonComparison';
import PokemonComparisonChart from './PokemonComparisonChart';

const CHART_COLORS = {
  pokemonA: '#ef5350',
  pokemonB: '#2563eb',
};

const PokemonComparisonChartContainer = ({ comparisonRows, pokemonAName, pokemonBName }) => {
  const chartData = useMemo(() => buildComparisonChartData(comparisonRows), [comparisonRows]);
  const chartSeries = useMemo(
    () => [
      {
        color: CHART_COLORS.pokemonA,
        dataKey: 'pokemonA',
        name: pokemonAName,
      },
      {
        color: CHART_COLORS.pokemonB,
        dataKey: 'pokemonB',
        name: pokemonBName,
      },
    ],
    [pokemonAName, pokemonBName]
  );

  return <PokemonComparisonChart chartData={chartData} chartSeries={chartSeries} />;
};

export default PokemonComparisonChartContainer;
