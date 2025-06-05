import feedSlice, { getFeeds, initialState, TFeedState } from './feedSlice';

describe('тестирование редьюсера feedSlice', () => {
  const mockOrders = [
    {
      _id: '1',
      status: 'done',
      name: 'Order 1',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      number: 1,
      ingredients: ['ing1', 'ing2']
    },
    {
      _id: '2',
      status: 'done',
      name: 'Order 2',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      number: 2,
      ingredients: ['ing3', 'ing4']
    }
  ];

  const mockActions = {
    pending: {
      type: getFeeds.pending.type,
      payload: null
    },
    rejected: {
      type: getFeeds.rejected.type,
      error: { message: 'Funny mock-error' }
    },
    fulfilled: {
      type: getFeeds.fulfilled.type,
      payload: { orders: mockOrders }
    }
  };

  const testCases = [
    {
      name: 'pending',
      action: mockActions.pending,
      expectedState: {
        loading: true,
        error: null
      } as Partial<TFeedState>
    },
    {
      name: 'rejected',
      action: mockActions.rejected,
      expectedState: {
        loading: false,
        error: 'Funny mock-error'
      } as Partial<TFeedState>
    },
    {
      name: 'fulfilled',
      action: mockActions.fulfilled,
      expectedState: {
        loading: false,
        orders: mockOrders
      } as Partial<TFeedState>
    }
  ];

  testCases.forEach(({ name, action, expectedState }) => {
    test(`тест синхронного экшена getFeeds.${name}`, () => {
      const state = feedSlice(initialState, action);
      (Object.keys(expectedState) as Array<keyof TFeedState>).forEach((key) => {
        expect(state[key]).toEqual(expectedState[key]);
      });
    });
  });
});
