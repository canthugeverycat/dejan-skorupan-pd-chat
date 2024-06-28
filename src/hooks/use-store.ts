import React from 'react';

import { stores } from '../store/stores';

export const StoreContext = React.createContext(stores);

/**
 * Allows usage of MobX store in function components
 */
export const useStore = () => React.useContext(StoreContext);
