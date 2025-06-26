import cls from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';

import { observer } from 'mobx-react-lite';
import BottomBar from '@Timer/components/BottomBar';
import BackGroundCircle from '@Timer/components/BackGroundCircle';
import RunningBall from '@Timer/components/RunningBall';
import { colors } from '@Timer/constants/colors';
import { pad } from '@Timer/utils/format';
import { useTimerSize } from '@Timer/context/useTimerSize';
import { useStore } from '@Store/index';
import styles from './StopWatchTimer.module.css';

interface StopWatchTimerProps {
  active: boolean;
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
}

const StopWatchTimer = observer(
  ({ active, isRunning, setIsRunning }: StopWatchTimerProps) => {
    const { containerSize, radius, strokeWidth, centerX, centerY } =
      useTimerSize();

    const { timerStore } = useStore();

    const [ballkey, setBallkey] = useState(0);

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
      if (isRunning) {
        intervalRef.current = setInterval(() => {
          timerStore.setStopwatchSeconds(timerStore.StopwatchSeconds + 1);
        }, 10);
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }, [isRunning, timerStore]);

    const handlePause = useCallback(() => setIsRunning(false), [setIsRunning]);

    const handleStart = useCallback(() => {
      setIsRunning(true);
    }, [setIsRunning]);

    const handleReset = useCallback(() => {
      timerStore.setStopwatchSeconds(0);
      setIsRunning(false);
      setBallkey(prev => prev + 1);
    }, [setIsRunning, timerStore]);

    const formatTime = useCallback((s: number) => {
      const totalSeconds = Math.floor(s / 100);
      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const sec = totalSeconds % 60;
      const ms = s % 100;

      if (h > 0) {
        return `${h}:${pad(m, 2)}:${pad(sec, 2)}.${pad(ms, 2)}`;
      } else if (m > 0) {
        return `${pad(m, 2)}:${pad(sec, 2)}.${pad(ms, 2)}`;
      } else {
        return `${pad(sec, 2)}.${pad(ms, 2)}`;
      }
    }, []);

    return (
      <div className={cls(active ? styles.show : styles.dontShow)}>
        <div
          className={styles.stopWatchTimerContainer}
          onClick={() => {
            if (isRunning) {
              handlePause();
            } else {
              handleStart();
            }
          }}
        >
          <svg
            width={containerSize}
            height={containerSize}
            className={styles.circleSvg}
          >
            {/* 背景 */}
            <BackGroundCircle
              radius={radius}
              isRunning={isRunning}
              runningColor={colors.progress.running}
              idleColor={colors.progress.idle}
              centerX={centerX}
              centerY={centerY}
              strokeWidth={strokeWidth}
            />
            <RunningBall
              key={ballkey}
              isRunning={isRunning}
              radius={radius}
              runningColor={colors.background.running}
              idleColor={colors.background.idle}
              centerX={centerX}
              centerY={centerY}
              ballRadius={10}
              currentTime={timerStore.StopwatchSeconds}
              totalTime={4}
            />
          </svg>
          <div className={styles.centerContent}>
            <div className={styles.timeText}>
              {formatTime(timerStore.StopwatchSeconds)}
            </div>
          </div>
        </div>
        <BottomBar
          canReset={timerStore.StopwatchSeconds !== 0}
          shouldReset={false}
          isRunning={isRunning}
          handlePause={handlePause}
          handleStart={handleStart}
          handleReset={handleReset}
        />
      </div>
    );
  }
);

StopWatchTimer.displayName = 'StopWatchTimer';

export default StopWatchTimer;
