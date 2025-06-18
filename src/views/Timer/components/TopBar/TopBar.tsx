import { Button } from '@linktivity/link-ui';
import cls from 'clsx';
import styles from './TopBar.module.css';
import { useTranslation } from 'react-i18next';

const TopBar = ({
  activeTab,
  setActiveTab
}: {
  activeTab: 'countDownTimer' | 'stopwatch';
  setActiveTab: (tab: 'countDownTimer' | 'stopwatch') => void;
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.topBar}>
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
};

export default TopBar;
