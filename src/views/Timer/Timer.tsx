import { useEffect, useState } from 'react';
import styles from './timer.module.css';
import cls from 'clsx';
import CountDownTimer from './components/CountDownTimer/CountDownTimer';
import { Button } from '@linktivity/link-ui';

const Timer = () => {
  const [activeTab, setActiveTab] = useState<'countDownTimer' | 'stopwatch'>(
    'countDownTimer'
  );

  const [isCountDownTimerRunning, setIsCountDownTimerRunning] = useState(false);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const [shouldReset, setShouldReset] = useState(false);

  // 为了过eslint
  useEffect(() => {
    setIsStopwatchRunning(false);
  }, []);

  return (
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
    >
      <div className={styles.topBar}>
        <Button
          className={styles.tabActive}
          onClick={() => {
            if (activeTab !== 'countDownTimer') {
              setActiveTab('countDownTimer');
            }
          }}
        >
          タイマー
        </Button>
        <Button
          className={styles.tab}
          onClick={() => {
            if (activeTab !== 'stopwatch') {
              setActiveTab('stopwatch');
            }
          }}
        >
          ストップウォッチ
        </Button>
      </div>
      <CountDownTimer
        active={activeTab === 'countDownTimer'}
        isRunning={isCountDownTimerRunning}
        setIsRunning={setIsCountDownTimerRunning}
        shouldReset={shouldReset}
        setShouldReset={setShouldReset}
      />
      <>hello</>
    </div>
  );
};

export default Timer;
