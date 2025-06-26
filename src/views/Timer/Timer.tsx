import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from 'clsx';
import { observer } from 'mobx-react-lite';
import { useFocusTrap } from '@linktivity/link-hooks';
import CountDownTimer from '@Timer/components/CountDownTimer';
import StopWatchTimer from '@Timer/components/StopWatchTimer';
import TopBar from '@Timer/components/TopBar';
import { useTitle, useBeforeUnload } from '@/hooks';
import { TimerTab, TIMER_TABS } from '@Timer/types/timerTab';
import timerStore from '@Store/modules/timer';
import styles from './timer.module.css';

const Timer = observer(() => {
  const [activeTab, setActiveTab] = useState<TimerTab>(
    TIMER_TABS.COUNT_DOWN_TIMER
  );
  const { t } = useTranslation();

  const focusTrapRef = useFocusTrap(true);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        if (activeTab === TIMER_TABS.COUNT_DOWN_TIMER) {
          setActiveTab(TIMER_TABS.STOPWATCH);
        } else {
          setActiveTab(TIMER_TABS.COUNT_DOWN_TIMER);
        }
      }
    },
    [activeTab]
  );

  useBeforeUnload(timerStore.CountDownRunning || timerStore.StopwatchRunning);

  useTitle(t('views.timer.title'));

  return (
    <>
      <div
        className={cls(
          styles.wholeContainer,
          (activeTab === TIMER_TABS.COUNT_DOWN_TIMER &&
            timerStore.CountDownRunning) ||
            (activeTab === TIMER_TABS.STOPWATCH && timerStore.StopwatchRunning)
            ? styles.wholeContainerRunning
            : activeTab === TIMER_TABS.COUNT_DOWN_TIMER &&
                timerStore.ShouldReset
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
          active={activeTab === TIMER_TABS.COUNT_DOWN_TIMER}
          isRunning={timerStore.CountDownRunning}
          setIsRunning={value => timerStore.setCountDownRunning(value)}
          shouldReset={timerStore.ShouldReset}
          setShouldReset={value => timerStore.setShouldReset(value)}
        />
        <StopWatchTimer
          active={activeTab === TIMER_TABS.STOPWATCH}
          isRunning={timerStore.StopwatchRunning}
          setIsRunning={value => timerStore.setStopwatchRunning(value)}
        />
      </div>
    </>
  );
});

export default Timer;
