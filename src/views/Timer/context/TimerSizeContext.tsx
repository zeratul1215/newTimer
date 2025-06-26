import React, { createContext, useContext, useMemo } from 'react';
import { useWindowSize } from '@/hooks';
import { calculateResponsiveSize } from '../utils/calculateResponsiveSize';

interface TimerSizeContextType {
  containerSize: number;
  radius: number;
  strokeWidth: number;
  centerX: number;
  centerY: number;
}

const TimerSizeContext = createContext<TimerSizeContextType | null>(null);

export const TimerSizeProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { width } = useWindowSize();

  const timerSize = useMemo(() => {
    const { containerSize, radius, strokeWidth } =
      calculateResponsiveSize(width);
    return {
      containerSize,
      radius,
      strokeWidth,
      centerX: containerSize / 2,
      centerY: containerSize / 2
    };
  }, [width]);

  return (
    <TimerSizeContext.Provider value={timerSize}>
      {children}
    </TimerSizeContext.Provider>
  );
};

export const useTimerSize = (): TimerSizeContextType => {
  const context = useContext(TimerSizeContext);
  if (!context) {
    throw new Error('useTimerSize must be used within a TimerSizeProvider');
  }
  return context;
};
