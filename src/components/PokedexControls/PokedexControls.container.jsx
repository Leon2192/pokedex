import { useCallback, useMemo } from 'react';
import { useFormik } from 'formik';
import { POKEDEX_FILTER_DEFAULTS } from '@/constants/filters';
import { pokedexControlsSchema } from '@/schemas';
import { getPokemonTypeLabel } from '@/utils/pokemon';
import PokedexControls from './PokedexControls';

const PokedexControlsContainer = ({
  generationOptions,
  initialValues,
  isGenerationsLoading,
  isTypesLoading,
  onFiltersChange,
  typeOptions,
}) => {
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: pokedexControlsSchema,
    onSubmit: onFiltersChange,
  });
  const { errors, handleBlur, setFieldValue, setValues, touched, values } = formik;
  const hasActiveFilters =
    values.search.trim() !== POKEDEX_FILTER_DEFAULTS.search ||
    values.type !== POKEDEX_FILTER_DEFAULTS.type ||
    values.generation !== POKEDEX_FILTER_DEFAULTS.generation;

  const mappedTypeOptions = useMemo(
    () =>
      typeOptions.map((type) => ({
        label: getPokemonTypeLabel(type.name),
        value: type.name,
      })),
    [typeOptions]
  );

  const mappedGenerationOptions = useMemo(
    () =>
      generationOptions
        .filter((generation) => generation.id)
        .map((generation) => ({
          label: `Generacion ${generation.id}`,
          value: String(generation.id),
        })),
    [generationOptions]
  );

  const handleSearchChange = useCallback(
    (event) => {
      const nextValues = {
        ...values,
        search: event.target.value,
      };

      setFieldValue('search', event.target.value);
      onFiltersChange(nextValues);
    },
    [onFiltersChange, setFieldValue, values]
  );

  const handleTypeChange = useCallback(
    (event) => {
      const nextValues = {
        ...values,
        type: event.target.value,
      };

      setFieldValue('type', event.target.value);
      onFiltersChange(nextValues);
    },
    [onFiltersChange, setFieldValue, values]
  );

  const handleGenerationChange = useCallback(
    (event) => {
      const nextValues = {
        ...values,
        generation: event.target.value,
      };

      setFieldValue('generation', event.target.value);
      onFiltersChange(nextValues);
    },
    [onFiltersChange, setFieldValue, values]
  );

  const handleReset = useCallback(() => {
    setValues(POKEDEX_FILTER_DEFAULTS);
    onFiltersChange(POKEDEX_FILTER_DEFAULTS);
  }, [onFiltersChange, setValues]);

  return (
    <PokedexControls
      errors={errors}
      generationOptions={mappedGenerationOptions}
      handleBlur={handleBlur}
      handleGenerationChange={handleGenerationChange}
      handleReset={handleReset}
      handleSearchChange={handleSearchChange}
      handleTypeChange={handleTypeChange}
      hasActiveFilters={hasActiveFilters}
      isGenerationsLoading={isGenerationsLoading}
      isTypesLoading={isTypesLoading}
      touched={touched}
      typeOptions={mappedTypeOptions}
      values={values}
    />
  );
};

export default PokedexControlsContainer;
