import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from 'clsx';
import { observer } from 'mobx-react-lite';
import { useFocusTrap } from '@linktivity/link-hooks';
import CountDownTimer from '@Timer/components/CountDownTimer';
import StopWatchTimer from '@Timer/components/StopWatchTimer';
import TopBar from '@Timer/components/TopBar';
import { useTitle } from '@/hooks';
import { TimerTab } from '@Timer/types/timerTab';
import timerStore from '@Store/modules/timer';
import styles from './timer.module.css';
import { addUnloadEvent } from './utils/confirm';

const Timer = observer(() => {
  const [activeTab, setActiveTab] = useState<TimerTab>('countDownTimer');
  const { t } = useTranslation();

  const focusTrapRef = useFocusTrap(true);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
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

  useEffect(() => {
    addUnloadEvent();
  }, []);

  useTitle(t('views.timer.title'));

  return (
    <>
      <div
        className={cls(
          styles.wholeContainer,
          (activeTab === 'countDownTimer' && timerStore.CountDownRunning) ||
            (activeTab === 'stopwatch' && timerStore.StopwatchRunning)
            ? styles.wholeContainerRunning
            : activeTab === 'countDownTimer' && timerStore.ShouldReset
              ? styles.wholeContainerShouldReset
              : styles.wholeContainerIdle
        )}
        onKeyDown={handleKeyDown}
      >
        <TopBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          ref={focusTrapRef}
        />
        <CountDownTimer
          active={activeTab === 'countDownTimer'}
          isRunning={timerStore.CountDownRunning}
          setIsRunning={value => timerStore.setCountDownRunning(value)}
          shouldReset={timerStore.ShouldReset}
          setShouldReset={value => timerStore.setShouldReset(value)}
        />
        <StopWatchTimer
          active={activeTab === 'stopwatch'}
          isRunning={timerStore.StopwatchRunning}
          setIsRunning={value => timerStore.setStopwatchRunning(value)}
        />
      </div>
    </>
  );
});

export default Timer;
