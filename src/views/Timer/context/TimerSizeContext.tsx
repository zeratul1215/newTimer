import { createContext } from 'react';
import { TimerSizeContextType } from './TimerSizeContextType';

export const TimerSizeContext = createContext<TimerSizeContextType | null>(
  null
);
