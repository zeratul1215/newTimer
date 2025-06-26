import React from 'react';
import timerStore, { TimerStore } from './modules/timer';
export type RootStore = {
  timerStore: TimerStore;
};

export const store: RootStore = {
  timerStore
};

const StoreContext = React.createContext<RootStore>(store);

export const StoreProvider = StoreContext.Provider;

export const useStore = () => React.useContext(StoreContext);

export { timerStore };
