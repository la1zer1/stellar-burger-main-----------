import orderSlice, { initialState, getOrderByNumber, TOrderState } from './orderSlice';

describe('тестирование редьюсера orderSlice', () => {
  const mockOrder = {
    _id: '1',
    status: 'done',
    name: 'Test Order',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    number: 1234,
    ingredients: ['ing1', 'ing2']
  };

  const mockActions = {
    pending: {
      type: getOrderByNumber.pending.type,
      payload: null
    },
    rejected: {
      type: getOrderByNumber.rejected.type,
      error: { message: 'Funny mock-error' }
    },
    fulfilled: {
      type: getOrderByNumber.fulfilled.type,
      payload: { orders: [mockOrder] }
    }
  };

  const testCases = [
    {
      name: 'pending',
      action: mockActions.pending,
      expectedState: {
        request: true,
        error: null
      } as Partial<TOrderState>
    },
    {
      name: 'rejected', 
      action: mockActions.rejected,
      expectedState: {
        request: false,
        error: 'Funny mock-error'
      } as Partial<TOrderState>
    },
    {
      name: 'fulfilled',
      action: mockActions.fulfilled,
      expectedState: {
        request: false,
        error: null,
        orderByNumberResponse: mockOrder
      } as Partial<TOrderState>
    }
  ];

  describe('тестирование асинхронного POST экшена getOrderByNumber', () => {
    testCases.forEach(({ name, action, expectedState }) => {
      test(`тест синхронного экшена getOrderByNumber.${name}`, () => {
        const nextState = orderSlice(initialState, action);
        (Object.keys(expectedState) as Array<keyof TOrderState>).forEach((key) => {
          expect(nextState[key]).toBe(expectedState[key]);
        });
      });
    });
  });
});
