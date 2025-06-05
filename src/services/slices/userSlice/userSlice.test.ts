import userSlice, {
  getUser,
  getOrdersAll,
  initialState,
  registerUser,
  loginUser,
  updateUser,
  logoutUser,
  TUserState
} from './userSlice';

describe('тестирование редьюсера userSlice', () => {
  const mockUser = {
    name: 'someName',
    email: 'someEmail'
  };

  const mockOrders = [
    {
      _id: '1',
      status: 'done',
      name: 'Order 1',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      number: 1234,
      ingredients: ['ing1', 'ing2']
    },
    {
      _id: '2',
      status: 'pending',
      name: 'Order 2',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      number: 1235,
      ingredients: ['ing3', 'ing4']
    }
  ];

  const createTestCase = (actionCreator: any, config: {
    mockPayload?: any,
    assertions: {
      pending?: Partial<TUserState>,
      rejected?: Partial<TUserState>,
      fulfilled?: Partial<TUserState>
    }
  }) => {
    const actions = {
      pending: {
        type: actionCreator.pending.type,
        payload: null
      },
      rejected: {
        type: actionCreator.rejected.type,
        error: { message: 'Funny mock-error' }
      },
      fulfilled: {
        type: actionCreator.fulfilled.type,
        payload: config.mockPayload
      }
    };

    return {
      name: actionCreator.typePrefix,
      actions,
      assertions: config.assertions
    };
  };

  const testCases = [
    createTestCase(getUser, {
      mockPayload: { user: mockUser },
      assertions: {
        pending: { request: false, error: null },
        rejected: { request: false, error: null },
        fulfilled: { request: false, userData: mockUser }
      }
    }),
    createTestCase(getOrdersAll, {
      mockPayload: mockOrders,
      assertions: {
        pending: { request: true, error: null },
        rejected: { request: false, error: 'Funny mock-error' },
        fulfilled: { request: false, userOrders: mockOrders }
      }
    }),
    createTestCase(registerUser, {
      mockPayload: { user: mockUser },
      assertions: {
        pending: { request: true, error: null },
        rejected: { request: false, error: 'Funny mock-error' },
        fulfilled: { request: false, error: null, userData: mockUser }
      }
    }),
    createTestCase(loginUser, {
      mockPayload: { user: mockUser },
      assertions: {
        pending: { loginUserRequest: true, isAuthChecked: true, isAuthenticated: false, error: null },
        rejected: { isAuthChecked: false, isAuthenticated: false, loginUserRequest: false, error: 'Funny mock-error' },
        fulfilled: { isAuthChecked: false, isAuthenticated: true, loginUserRequest: false, error: null, userData: mockUser }
      }
    }),
    createTestCase(updateUser, {
      mockPayload: { user: mockUser },
      assertions: {
        pending: { request: true, error: null },
        rejected: { request: false, error: 'Funny mock-error' },
        fulfilled: { request: false, error: null, response: mockUser }
      }
    }),
    createTestCase(logoutUser, {
      mockPayload: null,
      assertions: {
        pending: { request: true, isAuthChecked: true, isAuthenticated: true, error: null },
        rejected: { isAuthChecked: false, isAuthenticated: true, request: false, error: 'Funny mock-error' },
        fulfilled: { isAuthChecked: false, isAuthenticated: false, request: false, error: null, userData: null }
      }
    })
  ];

  testCases.forEach(testCase => {
    describe(`тестирование асинхронного экшена ${testCase.name}`, () => {
      Object.entries(testCase.assertions).forEach(([status, expectedState]) => {
        test(`тест синхронного экшена ${testCase.name}.${status}`, () => {
          const nextState = userSlice(initialState, testCase.actions[status as keyof typeof testCase.actions]);
          
          Object.entries(expectedState).forEach(([key, value]) => {
            expect(nextState[key as keyof TUserState]).toEqual(value);
          });
        });
      });
    });
  });
});
