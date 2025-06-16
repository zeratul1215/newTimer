import { useCallback, useState } from 'react';
import cls from 'clsx';
import { Helmet } from 'react-helmet-async';
import CountDownTimer from '@Timer/components/CountDownTimer/CountDownTimer';
import StopWatchTimer from '@Timer/components/StopWatchTimer';
import TopBar from '@Timer/components/TopBar';
import styles from './timer.module.css';

const Timer = () => {
  const [activeTab, setActiveTab] = useState<'countDownTimer' | 'stopwatch'>(
    'countDownTimer'
  );

  const [isCountDownTimerRunning, setIsCountDownTimerRunning] = useState(false);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const [shouldReset, setShouldReset] = useState(false);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      // e.preventDefault();
      if (e.key === 'Tab') {
        e.preventDefault();
        if (activeTab === 'countDownTimer') {
          setActiveTab('stopwatch');
        } else {
          setActiveTab('countDownTimer');
        }
      }
    },
    [activeTab]
  );

  return (
    <>
      <Helmet>
        <title>计时器</title>
      </Helmet>
      <div
        className={cls(
          styles.wholeContainer,
          (activeTab === 'countDownTimer' && isCountDownTimerRunning) ||
            (activeTab === 'stopwatch' && isStopwatchRunning)
            ? styles.wholeContainerRunning
            : activeTab === 'countDownTimer' && shouldReset
              ? styles.wholeContainerShouldReset
              : styles.wholeContainerIdle
        )}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <TopBar activeTab={activeTab} setActiveTab={setActiveTab} />
        <CountDownTimer
          active={activeTab === 'countDownTimer'}
          isRunning={isCountDownTimerRunning}
          setIsRunning={setIsCountDownTimerRunning}
          shouldReset={shouldReset}
          setShouldReset={setShouldReset}
        />
        <StopWatchTimer
          active={activeTab === 'stopwatch'}
          isRunning={isStopwatchRunning}
          setIsRunning={setIsStopwatchRunning}
        />
      </div>
    </>
  );
};

export default Timer;
