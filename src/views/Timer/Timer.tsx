import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from 'clsx';
import CountDownTimer from '@Timer/components/CountDownTimer';
import StopWatchTimer from '@Timer/components/StopWatchTimer';
import TopBar from '@Timer/components/TopBar';
import { useTitle } from '@/hooks';

import styles from './timer.module.css';

const Timer = () => {
  const [activeTab, setActiveTab] = useState<'countDownTimer' | 'stopwatch'>(
    'countDownTimer'
  );
  const { t } = useTranslation();


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

  useTitle(t('views.timer.title'));

  return (
    <>
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
        // ref={focusTrapRef}
        // tabIndex={0}
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
