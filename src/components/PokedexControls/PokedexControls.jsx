import React from 'react';
import {
  ActionButton,
  Controls,
  Field,
  FieldError,
  Input,
  Label,
  ResetButton,
  Select,
} from './PokedexControls.styled';

const PokedexControls = ({
  errors,
  generationOptions,
  handleBlur,
  handleGenerationChange,
  handleReset,
  handleSearchChange,
  handleSubmit,
  handleTypeChange,
  isGenerationsLoading,
  isTypesLoading,
  touched,
  typeOptions,
  values,
}) => (
  <Controls onSubmit={handleSubmit}>
    <Field>
      <Label htmlFor="search">Buscar</Label>
      <Input
        id="search"
        name="search"
        onBlur={handleBlur}
        onChange={handleSearchChange}
        placeholder="Nombre o numero"
        type="search"
        value={values.search}
      />
      {touched.search && errors.search ? <FieldError>{errors.search}</FieldError> : null}
    </Field>

    <Field>
      <Label htmlFor="type">Tipo</Label>
      <Select
        id="type"
        name="type"
        disabled={isTypesLoading}
        onBlur={handleBlur}
        onChange={handleTypeChange}
        value={values.type}
      >
        <option value="all">Todos los tipos</option>
        {typeOptions.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </Select>
    </Field>

    <Field>
      <Label htmlFor="generation">Generacion</Label>
      <Select
        id="generation"
        name="generation"
        disabled={isGenerationsLoading}
        onBlur={handleBlur}
        onChange={handleGenerationChange}
        value={values.generation}
      >
        <option value="all">Todas las generaciones</option>
        {generationOptions.map((generation) => (
          <option key={generation.value} value={generation.value}>
            {generation.label}
          </option>
        ))}
      </Select>
    </Field>

    <ActionButton type="submit">Aplicar</ActionButton>
    <ResetButton type="button" onClick={handleReset}>
      Limpiar
    </ResetButton>
  </Controls>
);

export default React.memo(PokedexControls);
