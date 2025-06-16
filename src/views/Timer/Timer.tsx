import { useCallback, useState } from 'react';
import styles from './timer.module.css';
import cls from 'clsx';
import CountDownTimer from './components/CountDownTimer/CountDownTimer';
import { Button } from '@linktivity/link-ui';
import StopWatchTimer from './components/StopWatchTimer';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const Timer = () => {
  const { t } = useTranslation();
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
    [activeTab, setActiveTab]
  );

  return (
    <>
      <Helmet>
        <title>计时器 | 我的应用</title>
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
        <div className={styles.topBar}>
          <Button
            className={cls(
              activeTab === 'countDownTimer'
                ? styles.tabActive
                : styles.tabInactive
            )}
            onClick={() => {
              if (activeTab !== 'countDownTimer') {
                setActiveTab('countDownTimer');
              }
            }}
          >
            {t('views.timer.countDownTimer')}
          </Button>
          <Button
            className={cls(
              activeTab === 'stopwatch' ? styles.tabActive : styles.tabInactive
            )}
            onClick={() => {
              if (activeTab !== 'stopwatch') {
                setActiveTab('stopwatch');
              }
            }}
          >
            {t('views.timer.stopwatch')}
          </Button>
        </div>
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
