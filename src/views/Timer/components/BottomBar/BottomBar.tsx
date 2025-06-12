import styles from './BottomBar.module.css';
import { Button } from '@linktivity/link-ui';

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
          {isRunning ? '⏸' : '▶️'}
        </Button>
      )}
      {canReset && (
        <Button className={styles.resetBtn} onClick={handleReset}>
          🔄
        </Button>
      )}
    </div>
  );
};

export default BottomBar;
