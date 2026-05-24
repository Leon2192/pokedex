import * as Yup from 'yup';

export const pokedexControlsSchema = Yup.object({
  search: Yup.string().max(40, 'Usa 40 caracteres o menos'),
  type: Yup.string().required(),
  generation: Yup.string().required(),
});
