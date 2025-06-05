import constructorSlice, {
  addIngredient,
  initialState,
  moveIngredientDown,
  moveIngredientUp,
  orderBurger,
  removeIngredient
} from './constructorSlice';
import { expect, test, describe } from '@jest/globals';

describe('constructorSlice reducer tests', () => {
  const baseState = {
    constructorItems: {
      bun: null,
      ingredients: []
    },
    loading: false,
    orderRequest: false,
    orderModalData: null,
    error: null
  };

  test('should add ingredient to ingredients array', () => {
    const ingredient = {
      _id: '643d69a5c3f7b9001cfa0943',
      name: 'Соус фирменный Space Sauce',
      type: 'sauce',
      proteins: 50,
      fat: 22,
      carbohydrates: 11,
      calories: 14,
      price: 80,
      image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
    };

    const newState = constructorSlice(baseState, addIngredient(ingredient));

    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...ingredient,
      id: expect.any(String)
    });
  });

  test('should add bun to empty bun field', () => {
    const bun = {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    };

    const newState = constructorSlice(baseState, addIngredient(bun));

    expect(newState.constructorItems.bun).toEqual({
      ...bun,
      id: expect.any(String)
    });
  });

  test('should replace existing bun with new one', () => {
    const initialBun = {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      id: 'its so funny =D',
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    };

    const newBun = {
      _id: '643d69a5c3f7b9001cfa093d',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
    };

    const stateWithBun = {
      ...baseState,
      constructorItems: {
        ...baseState.constructorItems,
        bun: initialBun
      }
    };

    const newState = constructorSlice(stateWithBun, addIngredient(newBun));

    expect(newState.constructorItems.bun).toEqual({
      ...newBun,
      id: expect.any(String)
    });
  });

  test('should remove ingredient from constructor', () => {
    const stateWithIngredient = {
      ...baseState,
      constructorItems: {
        ...baseState.constructorItems,
        ingredients: [{
          id: 'funny',
          _id: '643d69a5c3f7b9001cfa0944',
          name: 'Соус традиционный галактический',
          type: 'sauce',
          proteins: 42,
          fat: 24,
          carbohydrates: 42,
          calories: 99,
          price: 15,
          image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png'
        }]
      }
    };

    const newState = constructorSlice(stateWithIngredient, removeIngredient('funny'));

    expect(newState.constructorItems.ingredients).toEqual([]);
  });

  describe('ingredient movement tests', () => {
    const stateWithIngredients = {
      ...baseState,
      constructorItems: {
        bun: {
          id: 'funBun',
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
        },
        ingredients: [
          {
            id: 'funnyPig1',
            _id: '643d69a5c3f7b9001cfa0944',
            name: 'Соус традиционный галактический',
            type: 'sauce',
            proteins: 42,
            fat: 24,
            carbohydrates: 42,
            calories: 99,
            price: 15,
            image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png'
          },
          {
            id: 'funnyPig2',
            _id: '643d69a5c3f7b9001cfa0946',
            name: 'Хрустящие минеральные кольца',
            type: 'main',
            proteins: 808,
            fat: 689,
            carbohydrates: 609,
            calories: 986,
            price: 300,
            image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/mineral_rings-large.png'
          },
          {
            id: 'funnyPig3',
            _id: '643d69a5c3f7b9001cfa0947',
            name: 'Плоды Фалленианского дерева',
            type: 'main',
            proteins: 20,
            fat: 5,
            carbohydrates: 55,
            calories: 77,
            price: 874,
            image: 'https://code.s3.yandex.net/react/code/sp_1.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png'
          }
        ]
      }
    };

    const expectedIngredients = [
      stateWithIngredients.constructorItems.ingredients[0],
      stateWithIngredients.constructorItems.ingredients[2],
      stateWithIngredients.constructorItems.ingredients[1]
    ];

    test('should move ingredient up', () => {
      const newState = constructorSlice(stateWithIngredients, moveIngredientUp(2));
      expect(newState.constructorItems.ingredients).toEqual(expectedIngredients);
    });

    test('should move ingredient down', () => {
      const newState = constructorSlice(stateWithIngredients, moveIngredientDown(1));
      expect(newState.constructorItems.ingredients).toEqual(expectedIngredients);
    });
  });

  describe('orderBurger async action tests', () => {
    test('pending state', () => {
      const state = constructorSlice(initialState, {
        type: orderBurger.pending.type,
        payload: null
      });
      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    test('rejected state', () => {
      const state = constructorSlice(initialState, {
        type: orderBurger.rejected.type,
        error: { message: 'Funny mock-error' }
      });
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Funny mock-error');
      expect(state.orderModalData).toBe(null);
    });

    test('fulfilled state', () => {
      const state = constructorSlice(initialState, {
        type: orderBurger.fulfilled.type,
        payload: { order: { number: 404 } }
      });
      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
      expect(state.orderModalData?.number).toBe(404);
    });
  });
});
