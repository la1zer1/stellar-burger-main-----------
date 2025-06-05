import ingredientSlice, {
  getIngredients,
  initialState,
  TIngredientState
} from './ingredientSlice';

describe('тестирование редьюсера ingredientSlice', () => {
  const mockIngredients = [
    {
      _id: '1',
      name: 'Ingredient 1',
      type: 'main',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://example.com/image1.png',
      image_mobile: 'https://example.com/image1-mobile.png',
      image_large: 'https://example.com/image1-large.png'
    },
    {
      _id: '2',
      name: 'Ingredient 2',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 200,
      price: 500,
      image: 'https://example.com/image2.png',
      image_mobile: 'https://example.com/image2-mobile.png',
      image_large: 'https://example.com/image2-large.png'
    }
  ];

  describe('тестирование асинхронных экшенов', () => {
    test('должен обработать pending состояние', () => {
      const action = {
        type: getIngredients.pending.type,
        payload: null
      };
      const expectedState = {
        loading: true,
        error: null
      } as Partial<TIngredientState>;
      const state = ingredientSlice(initialState, action);
      (Object.keys(expectedState) as Array<keyof TIngredientState>).forEach((key) => {
        expect(state[key]).toEqual(expectedState[key]);
      });
    });

    test('должен обработать rejected состояние', () => {
      const action = {
        type: getIngredients.rejected.type,
        error: { message: 'Funny mock-error' }
      };
      const expectedState = {
        loading: false,
        error: 'Funny mock-error'
      } as Partial<TIngredientState>;
      const state = ingredientSlice(initialState, action);
      (Object.keys(expectedState) as Array<keyof TIngredientState>).forEach((key) => {
        expect(state[key]).toEqual(expectedState[key]);
      });
    });

    test('должен обработать fulfilled состояние', () => {
      const action = {
        type: getIngredients.fulfilled.type,
        payload: mockIngredients
      };
      const expectedState = {
        loading: false,
        ingredients: mockIngredients
      } as Partial<TIngredientState>;
      const state = ingredientSlice(initialState, action);
      (Object.keys(expectedState) as Array<keyof TIngredientState>).forEach((key) => {
        expect(state[key]).toEqual(expectedState[key]);
      });
    });
  });
});
