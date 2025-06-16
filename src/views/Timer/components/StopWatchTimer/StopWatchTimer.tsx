import cls from 'clsx';
import styles from './StopWatchTimer.module.css';
import BottomBar from '../BottomBar';
import { useCallback, useEffect, useRef, useState } from 'react';
import BackGroundCircle from '../BackGroundCircle';
import RunningBall from '../RunningBall';
import { colors } from '../../constants/colors';
import { pad } from '../../utils/format';

const StopWatchTimer = ({
  active,
  isRunning,
  setIsRunning
}: {
  active: boolean;
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
}) => {
  const radius = 180;

  const [seconds, setSeconds] = useState(0);
  const [isReset, setIsReset] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 10);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const handlePause = useCallback(() => setIsRunning(false), [setIsRunning]);

  const handleStart = useCallback(() => {
    setIsRunning(true);
  }, [setIsRunning]);

  const handleReset = useCallback(() => {
    setSeconds(0);
    setIsRunning(false);
    setIsReset(true);
    setTimeout(() => {
      setIsReset(false);
    }, 10);
  }, [setSeconds, setIsRunning]);

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
        <svg width={400} height={400} className={styles.circleSvg}>
          {/* 背景 */}
          <BackGroundCircle
            radius={radius}
            isRunning={isRunning}
            runningColor={colors.progress.running}
            idleColor={colors.progress.idle}
            centerX={200}
            centerY={200}
          />
          <RunningBall
            isRunning={isRunning}
            isReset={isReset}
            radius={radius}
            runningColor={colors.background.running}
            idleColor={colors.background.idle}
            centerX={200}
            centerY={200}
            ballRadius={10}
          />
        </svg>
        <div className={styles.centerContent}>
          <div className={styles.timeText}>{formatTime(seconds)}</div>
        </div>
      </div>
      <BottomBar
        canReset={seconds !== 0}
        shouldReset={false}
        isRunning={isRunning}
        handlePause={handlePause}
        handleStart={handleStart}
        handleReset={handleReset}
      />
    </div>
  );
};

export default StopWatchTimer;
