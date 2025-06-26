import { Button } from '@linktivity/link-ui';
import cls from 'clsx';
import styles from './TopBar.module.css';
import { useTranslation } from 'react-i18next';
import { forwardRef } from 'react';

import { TimerTab, TIMER_TABS } from '@Timer/types/timerTab';

const TopBar = forwardRef<
  HTMLDivElement,
  {
    activeTab: TimerTab;
    setActiveTab: (tab: TimerTab) => void;
  }
>(({ activeTab, setActiveTab }, ref) => {
  const { t } = useTranslation();

  return (
    <div className={styles.topBar} ref={ref}>
      <Button
        className={cls(
          activeTab === TIMER_TABS.COUNT_DOWN_TIMER
            ? styles.tabActive
            : styles.tabInactive
        )}
        onClick={() => {
          if (activeTab !== TIMER_TABS.COUNT_DOWN_TIMER) {
            setActiveTab(TIMER_TABS.COUNT_DOWN_TIMER);
          }
        }}
      >
        {t('views.timer.countDownTimer')}
      </Button>
      <Button
        className={cls(
          activeTab === TIMER_TABS.STOPWATCH
            ? styles.tabActive
            : styles.tabInactive
        )}
        onClick={() => {
          if (activeTab !== TIMER_TABS.STOPWATCH) {
            setActiveTab(TIMER_TABS.STOPWATCH);
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
