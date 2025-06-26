import { useMemo } from 'react';
import { useWindowSize } from '@/hooks';
import { calculateResponsiveSize } from '../utils/calculateResponsiveSize';
import { TimerSizeContext } from './TimerSizeContext';

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
