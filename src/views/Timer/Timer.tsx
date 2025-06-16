import { useCallback, useState } from 'react';
import styles from './timer.module.css';
import cls from 'clsx';
import CountDownTimer from './components/CountDownTimer/CountDownTimer';
import StopWatchTimer from './components/StopWatchTimer';
import { Helmet } from 'react-helmet-async';
import TopBar from './components/TopBar';

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
