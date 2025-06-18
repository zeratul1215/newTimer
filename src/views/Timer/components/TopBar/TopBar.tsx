import { Button } from '@linktivity/link-ui';
import cls from 'clsx';
import styles from './TopBar.module.css';
import { useTranslation } from 'react-i18next';
import { forwardRef } from 'react';

import { TimerTab } from '@Timer/types/timerTab';

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
          activeTab === 'countDownTimer' ? styles.tabActive : styles.tabInactive
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
  );
});

export default TopBar;
