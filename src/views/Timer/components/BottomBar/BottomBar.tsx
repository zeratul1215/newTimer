import styles from './BottomBar.module.css';
import { Button } from '@linktivity/link-ui';
import cls from 'clsx';

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
          className={cls(
            styles.startBtn,
            isRunning ? styles.startBtnRunning : styles.startBtnIdle
          )}
          onClick={isRunning ? handlePause : handleStart}
        >
          {isRunning ? '■' : '►'}
        </Button>
      )}
      {canReset && (
        <Button
          className={cls(
            styles.resetBtn,
            isRunning ? styles.resetBtnRunning : styles.resetBtnIdle
          )}
          onClick={handleReset}
        >
          ↻
        </Button>
      )}
    </div>
  );
};

export default BottomBar;
