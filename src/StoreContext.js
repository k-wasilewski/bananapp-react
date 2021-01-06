import { createContext, useContext } from 'react';

export const StoreContext = createContext({});
export const StoreProvider = StoreContext.Provider;
export const useStore = () => { return useContext(StoreContext) };