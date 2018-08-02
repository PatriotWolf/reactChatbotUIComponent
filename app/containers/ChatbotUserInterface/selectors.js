import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the chatbotUserInterface state domain
 */

const selectChatbotUserInterfaceDomain = state =>
    state.get('chatbotUserInterface', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ChatbotUserInterface
 */

const makeSelectChatbotUserInterface = () =>
    createSelector(selectChatbotUserInterfaceDomain, substate =>
        substate.toJS(),
    );

export default makeSelectChatbotUserInterface;
export { selectChatbotUserInterfaceDomain };
