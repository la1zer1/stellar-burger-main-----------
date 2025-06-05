import { rootReducer } from '../services/store';
import store from '../services/store';

describe('Store tests', () => {
  test('проверка работы rootReducer', () => {
    // Get expected state by running reducer with undefined state
    const expected = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    
    // Compare with actual store state
    expect(expected).toEqual(store.getState());
  });
});
