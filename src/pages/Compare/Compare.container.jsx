import { useCallback, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  buildComparisonRows,
  mapPokemonOptions,
  normalizeCompareValues,
} from '@/helpers/pokemonComparison';
import { getQueryDataStatus } from '@/helpers/queryStatus';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { useGetPokemonByNameOrIdQuery, useGetPokemonOptionsQuery } from '@/services/api/pokemonApi';
import Compare from './Compare';

const initialValues = {
  pokemonA: '',
  pokemonB: '',
};

const MAX_VISIBLE_OPTIONS = 48;

const filterPokemonOptions = (options, searchValue) => {
  const query = searchValue.trim().toLowerCase();

  if (!query) {
    return options.slice(0, MAX_VISIBLE_OPTIONS);
  }

  return options
    .filter((pokemon) => {
      const id = String(pokemon.id ?? '');

      return (
        pokemon.name.includes(query) ||
        pokemon.displayName.toLowerCase().includes(query) ||
        id.includes(query) ||
        pokemon.number.includes(query)
      );
    })
    .slice(0, MAX_VISIBLE_OPTIONS);
};

const createValidationSchema = (pokemonOptionNames) =>
  Yup.object({
    pokemonA: Yup.string()
      .trim()
      .required('Selecciona el primer Pokemon')
      .test('valid-pokemon-a', 'Elegir un Pokemon de la lista', (value) => {
        if (!value || pokemonOptionNames.size === 0) {
          return true;
        }

        return pokemonOptionNames.has(value.trim().toLowerCase());
      }),
    pokemonB: Yup.string()
      .trim()
      .required('Selecciona el segundo Pokemon')
      .test('valid-pokemon-b', 'Elegir un Pokemon de la lista', (value) => {
        if (!value || pokemonOptionNames.size === 0) {
          return true;
        }

        return pokemonOptionNames.has(value.trim().toLowerCase());
      })
      .test('different-pokemon', 'Elegir dos Pokemon diferentes', function validate(value) {
        if (!value || !this.parent.pokemonA) {
          return true;
        }

        return value.trim().toLowerCase() !== this.parent.pokemonA.trim().toLowerCase();
      }),
  });

const CompareContainer = () => {
  const isOnline = useNetworkStatus();
  const [submittedPair, setSubmittedPair] = useState(null);
  const [openSelector, setOpenSelector] = useState(null);
  const [searchValues, setSearchValues] = useState(initialValues);
  const {
    currentData: currentPokemonOptions,
    error: optionsError,
    fulfilledTimeStamp: optionsFulfilledTimeStamp,
    isError: isOptionsError,
    isFetching: isOptionsLoading,
    refetch: refetchOptions,
  } = useGetPokemonOptionsQuery();
  const rawPokemonOptions = currentPokemonOptions ?? [];

  const pokemonOptions = useMemo(() => mapPokemonOptions(rawPokemonOptions), [rawPokemonOptions]);
  const pokemonOptionNames = useMemo(
    () => new Set(rawPokemonOptions.map((pokemon) => pokemon.name)),
    [rawPokemonOptions]
  );
  const validationSchema = useMemo(
    () => createValidationSchema(pokemonOptionNames),
    [pokemonOptionNames]
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit(values, helpers) {
      setSubmittedPair(normalizeCompareValues(values));
      helpers.setSubmitting(false);
    },
  });
  const {
    errors,
    handleSubmit,
    isSubmitting,
    setFieldError,
    setFieldTouched,
    setFieldValue,
    touched,
    values,
  } = formik;

  const pokemonAQuery = useGetPokemonByNameOrIdQuery(submittedPair?.pokemonA, {
    skip: !submittedPair?.pokemonA,
  });
  const pokemonBQuery = useGetPokemonByNameOrIdQuery(submittedPair?.pokemonB, {
    skip: !submittedPair?.pokemonB,
  });

  const pokemonA = pokemonAQuery.currentData;
  const pokemonB = pokemonBQuery.currentData;
  const comparisonRows = useMemo(
    () => buildComparisonRows(pokemonA, pokemonB),
    [pokemonA, pokemonB]
  );
  const hasComparison = Boolean(pokemonA && pokemonB && comparisonRows.length > 0);
  const isComparisonLoading = Boolean(
    submittedPair &&
    !hasComparison &&
    (pokemonAQuery.isLoading ||
      pokemonBQuery.isLoading ||
      pokemonAQuery.isFetching ||
      pokemonBQuery.isFetching)
  );
  const isComparisonError = Boolean(pokemonAQuery.isError || pokemonBQuery.isError);
  const comparisonError = pokemonAQuery.error ?? pokemonBQuery.error;
  const isOptionsBlockingError = isOptionsError && rawPokemonOptions.length === 0;
  const isOptionsPending = isOptionsLoading && rawPokemonOptions.length === 0;
  const isComparisonBlockingError = isComparisonError && !hasComparison;
  const comparisonFulfilledTimeStamp = useMemo(() => {
    const timestamps = [pokemonAQuery.fulfilledTimeStamp, pokemonBQuery.fulfilledTimeStamp].filter(
      Boolean
    );

    return timestamps.length > 0 ? Math.min(...timestamps) : undefined;
  }, [pokemonAQuery.fulfilledTimeStamp, pokemonBQuery.fulfilledTimeStamp]);
  const dataStatus = useMemo(
    () =>
      getQueryDataStatus({
        fulfilledTimeStamp: comparisonFulfilledTimeStamp,
        hasData: hasComparison,
        isFetching: pokemonAQuery.isFetching || pokemonBQuery.isFetching,
        isOnline,
      }),
    [
      comparisonFulfilledTimeStamp,
      hasComparison,
      isOnline,
      pokemonAQuery.isFetching,
      pokemonBQuery.isFetching,
    ]
  );
  const optionsStatus = useMemo(
    () =>
      getQueryDataStatus({
        fulfilledTimeStamp: optionsFulfilledTimeStamp,
        hasData: rawPokemonOptions.length > 0,
        isFetching: isOptionsLoading,
        isOnline,
      }),
    [isOnline, isOptionsLoading, optionsFulfilledTimeStamp, rawPokemonOptions.length]
  );
  const pokemonAOptions = useMemo(
    () => filterPokemonOptions(pokemonOptions, searchValues.pokemonA),
    [pokemonOptions, searchValues.pokemonA]
  );
  const pokemonBOptions = useMemo(
    () => filterPokemonOptions(pokemonOptions, searchValues.pokemonB),
    [pokemonOptions, searchValues.pokemonB]
  );

  const updateSearchValue = useCallback((fieldName, value) => {
    setSearchValues((currentValues) => ({
      ...currentValues,
      [fieldName]: value,
    }));
  }, []);

  const handleSelectorFocus = useCallback((fieldName) => {
    setOpenSelector(fieldName);
  }, []);

  const handleSelectorBlur = useCallback(
    (fieldName) => {
      setFieldTouched(fieldName, true, true);
      setOpenSelector((currentSelector) =>
        currentSelector === fieldName ? null : currentSelector
      );
    },
    [setFieldTouched]
  );

  const handleSelectorSearch = useCallback(
    (fieldName, value) => {
      updateSearchValue(fieldName, value);
      setFieldValue(fieldName, value);
      setOpenSelector(fieldName);
    },
    [setFieldValue, updateSearchValue]
  );

  const handleSelectorSelect = useCallback(
    (fieldName, pokemon) => {
      updateSearchValue(fieldName, pokemon.displayName);
      setFieldValue(fieldName, pokemon.name, true);
      setFieldTouched(fieldName, true, false);
      setOpenSelector(null);
    },
    [setFieldTouched, setFieldValue, updateSearchValue]
  );

  const handleSelectorClear = useCallback(
    (fieldName) => {
      updateSearchValue(fieldName, '');
      setFieldValue(fieldName, '', false);
      setFieldTouched(fieldName, false, false);
      setFieldError(fieldName, undefined);
      setOpenSelector(fieldName);
    },
    [setFieldError, setFieldTouched, setFieldValue, updateSearchValue]
  );

  const pokemonASelector = useMemo(
    () => ({
      error: touched.pokemonA ? errors.pokemonA : '',
      fieldName: 'pokemonA',
      isOpen: openSelector === 'pokemonA',
      label: 'Primer Pokemon',
      options: pokemonAOptions,
      placeholder: 'Selecciona el primer Pokemon',
      searchValue: searchValues.pokemonA,
      selectedValue: values.pokemonA,
    }),
    [
      errors.pokemonA,
      openSelector,
      pokemonAOptions,
      searchValues.pokemonA,
      touched.pokemonA,
      values.pokemonA,
    ]
  );
  const pokemonBSelector = useMemo(
    () => ({
      error: touched.pokemonB ? errors.pokemonB : '',
      fieldName: 'pokemonB',
      isOpen: openSelector === 'pokemonB',
      label: 'Segundo Pokemon',
      options: pokemonBOptions,
      placeholder: 'Selecciona el segundo Pokemon',
      searchValue: searchValues.pokemonB,
      selectedValue: values.pokemonB,
    }),
    [
      errors.pokemonB,
      openSelector,
      pokemonBOptions,
      searchValues.pokemonB,
      touched.pokemonB,
      values.pokemonB,
    ]
  );

  const handleRetryComparison = useCallback(() => {
    if (submittedPair?.pokemonA) {
      pokemonAQuery.refetch();
    }

    if (submittedPair?.pokemonB) {
      pokemonBQuery.refetch();
    }
  }, [pokemonAQuery, pokemonBQuery, submittedPair]);

  return (
    <Compare
      comparisonError={comparisonError}
      comparisonRows={comparisonRows}
      dataStatus={dataStatus}
      handleSubmit={handleSubmit}
      hasComparison={hasComparison}
      isComparisonBlockingError={isComparisonBlockingError}
      isComparisonLoading={isComparisonLoading}
      isOptionsBlockingError={isOptionsBlockingError}
      isOptionsLoading={isOptionsPending}
      isSubmitting={isSubmitting}
      onSelectorBlur={handleSelectorBlur}
      onSelectorClear={handleSelectorClear}
      onSelectorFocus={handleSelectorFocus}
      onSelectorSearch={handleSelectorSearch}
      onSelectorSelect={handleSelectorSelect}
      onRetryComparison={handleRetryComparison}
      onRetryOptions={refetchOptions}
      optionsError={optionsError}
      optionsStatus={optionsStatus}
      pokemonASelector={pokemonASelector}
      pokemonA={pokemonA}
      pokemonBSelector={pokemonBSelector}
      pokemonB={pokemonB}
      submittedPair={submittedPair}
    />
  );
};

export default CompareContainer;
