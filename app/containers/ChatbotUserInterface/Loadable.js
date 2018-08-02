/**
 *
 * Asynchronously loads the component for ChatbotUserInterface
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null,
});
