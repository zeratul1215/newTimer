import { useContext } from 'react';
import { TimerSizeContext } from './TimerSizeContext';
import { TimerSizeContextType } from './TimerSizeContextType';

export const useTimerSize = (): TimerSizeContextType => {
  const context = useContext(TimerSizeContext);
  if (!context) {
    throw new Error('useTimerSize must be used within a TimerSizeProvider');
  }
  return context;
};
