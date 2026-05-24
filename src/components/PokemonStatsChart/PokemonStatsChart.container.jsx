import { useMemo } from 'react';
import PokemonStatsChart from './PokemonStatsChart';

const STAT_LABELS = {
  hp: 'PS',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'Ataque especial',
  'special-defense': 'Defensa especial',
  speed: 'Velocidad',
};

const buildChartData = (stats) =>
  stats.map((stat) => ({
    name: STAT_LABELS[stat.name] ?? stat.displayName,
    value: stat.value,
  }));

const PokemonStatsChartContainer = ({ stats }) => {
  const chartData = useMemo(() => buildChartData(stats), [stats]);

  return <PokemonStatsChart chartData={chartData} />;
};

export default PokemonStatsChartContainer;
