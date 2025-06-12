import styles from './BottomBar.module.css';
import { Button } from '@linktivity/link-ui';

const BottomBar = ({
  shouldReset = false,
  isRunning,
  handlePause,
  handleStart,
  handleReset
}: {
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
      <Button className={styles.resetBtn} onClick={handleReset}>
        🔄
      </Button>
    </div>
  );
};

export default BottomBar;
