import styles from './BottomBar.module.css';
import { Button } from '@linktivity/link-ui';
import { Refresh } from '@linktivity/link-icons';

const BottomBar = ({
  canReset = true,
  shouldReset = false,
  isRunning,
  handlePause,
  handleStart,
  handleReset
}: {
  canReset: boolean;
  shouldReset: boolean;
  isRunning: boolean;
  handlePause: () => void;
  handleStart: () => void;
  handleReset: () => void;
}) => {
  return (
    <div className={styles.bottomBar}>
      {!shouldReset && (
        <Button
          className={styles.startBtn}
          onClick={isRunning ? handlePause : handleStart}
        >
          {isRunning ? '⏸' : '▶'}
        </Button>
      )}
      {canReset && (
        <Button className={styles.resetBtn} onClick={handleReset}>
          <Refresh className={styles.Icon} />
        </Button>
      )}
    </div>
  );
};

export default BottomBar;
