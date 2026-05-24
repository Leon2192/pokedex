import * as Yup from 'yup';

export const createCompareSchema = (pokemonOptionNames) =>
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
