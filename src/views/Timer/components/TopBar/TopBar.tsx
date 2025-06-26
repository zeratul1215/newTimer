import { Button } from '@linktivity/link-ui';
import cls from 'clsx';
import styles from './TopBar.module.css';
import { useTranslation } from 'react-i18next';
import { forwardRef, useMemo } from 'react';

import { TimerTab, TIMER_TABS } from '@Timer/types/timerTab';

const TopBar = forwardRef<
  HTMLDivElement,
  {
    activeTab: TimerTab;
    setActiveTab: (tab: TimerTab) => void;
  }
>(({ activeTab, setActiveTab }, ref) => {
  const { t } = useTranslation();

  // 使用 useMemo 缓存常量值
  const countDownTimerTab = useMemo(() => TIMER_TABS.COUNT_DOWN_TIMER, []);
  const stopwatchTab = useMemo(() => TIMER_TABS.STOPWATCH, []);

  return (
    <div className={styles.topBar} ref={ref}>
      <Button
        className={cls(
          activeTab === countDownTimerTab
            ? styles.tabActive
            : styles.tabInactive
        )}
        onClick={() => {
          if (activeTab !== countDownTimerTab) {
            setActiveTab(countDownTimerTab);
          }
        }}
      >
        {t('views.timer.countDownTimer')}
      </Button>
      <Button
        className={cls(
          activeTab === stopwatchTab ? styles.tabActive : styles.tabInactive
        )}
        onClick={() => {
          if (activeTab !== stopwatchTab) {
            setActiveTab(stopwatchTab);
          }
        }}
      >
        {t('views.timer.stopwatch')}
      </Button>
    </div>
  );
});

TopBar.displayName = 'TopBar';

export default TopBar;
