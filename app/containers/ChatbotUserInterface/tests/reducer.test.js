import { fromJS } from 'immutable';
import chatbotUserInterfaceReducer from '../reducer';

describe('chatbotUserInterfaceReducer', () => {
  it('returns the initial state', () => {
    expect(chatbotUserInterfaceReducer(undefined, {})).toEqual(fromJS({}));
  });
});
