import { useCallback, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from 'clsx';
import { observer } from 'mobx-react-lite';
import { useFocusTrap } from '@linktivity/link-hooks';
import CountDownTimer from '@Timer/components/CountDownTimer';
import StopWatchTimer from '@Timer/components/StopWatchTimer';
import TopBar from '@Timer/components/TopBar';
import { useTitle, useBeforeUnload } from '@/hooks';
import { TimerTab, TIMER_TABS } from '@Timer/types/timerTab';
import { TimerSizeProvider } from '@Timer/context/TimerSizeProvider';
import timerStore from '@Store/modules/timer';
// import { StoreProvider, store } from '@Store/index';
import styles from './timer.module.css';

const TimerContent = observer(() => {
  // 使用 useMemo 缓存常量值
  const countDownTimerTab = useMemo(() => TIMER_TABS.COUNT_DOWN_TIMER, []);
  const stopwatchTab = useMemo(() => TIMER_TABS.STOPWATCH, []);

  const [activeTab, setActiveTab] = useState<TimerTab>(countDownTimerTab);
  const { t } = useTranslation();

  const focusTrapRef = useFocusTrap(true);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        if (activeTab === countDownTimerTab) {
          setActiveTab(stopwatchTab);
        } else {
          setActiveTab(countDownTimerTab);
        }
      }
    },
    [activeTab, countDownTimerTab, stopwatchTab]
  );

  useBeforeUnload(timerStore.CountDownRunning || timerStore.StopwatchRunning);

  useTitle(t('views.timer.title'));

  return (
    <div
      className={cls(
        styles.wholeContainer,
        (activeTab === countDownTimerTab && timerStore.CountDownRunning) ||
          (activeTab === stopwatchTab && timerStore.StopwatchRunning)
          ? styles.wholeContainerRunning
          : activeTab === countDownTimerTab && timerStore.ShouldReset
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
        active={activeTab === countDownTimerTab}
        isRunning={timerStore.CountDownRunning}
        setIsRunning={value => timerStore.setCountDownRunning(value)}
        shouldReset={timerStore.ShouldReset}
        setShouldReset={value => timerStore.setShouldReset(value)}
      />
      <StopWatchTimer
        active={activeTab === stopwatchTab}
        isRunning={timerStore.StopwatchRunning}
        setIsRunning={value => timerStore.setStopwatchRunning(value)}
      />
    </div>

  );
});

const Timer = () => {
  return (
    <TimerSizeProvider>
      {/* <StoreProvider value={store}> */}
      <TimerContent />
      {/* </StoreProvider> */}
    </TimerSizeProvider>
  );
};

export default Timer;
