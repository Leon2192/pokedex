import { useCallback, useMemo } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { POKEDEX_FILTER_DEFAULTS } from '@/constants/filters';
import { getPokemonTypeLabel } from '@/utils/pokemon';
import PokedexControls from './PokedexControls';

const validationSchema = Yup.object({
  search: Yup.string().max(40, 'Usa 40 caracteres o menos'),
  type: Yup.string().required(),
  generation: Yup.string().required(),
});

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
    validationSchema,
    onSubmit: onFiltersChange,
  });
  const { errors, handleBlur, handleSubmit, setFieldValue, setValues, touched, values } = formik;

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
      handleSubmit={handleSubmit}
      handleTypeChange={handleTypeChange}
      isGenerationsLoading={isGenerationsLoading}
      isTypesLoading={isTypesLoading}
      touched={touched}
      typeOptions={mappedTypeOptions}
      values={values}
    />
  );
};

export default PokedexControlsContainer;
