import cls from 'clsx';
import styles from './RunningBall.module.css';

const RunningBall = ({
  isRunning,
  isReset,
  radius,
  runningColor,
  idleColor,
  centerX = 200,
  centerY = 200,
  ballRadius = 10
}: {
  isRunning: boolean;
  isReset: boolean;
  radius: number;
  runningColor?: string;
  idleColor?: string;
  centerX?: number;
  centerY?: number;
  ballRadius?: number;
}) => {
  const ballStyle = {
    '--ball-origin-x': `${centerX}px`,
    '--ball-origin-y': `${centerY}px`
  } as React.CSSProperties;

  return (
    <circle
      className={cls(
        styles.movingBall,
        isRunning && styles.running,
        isReset && styles.reset
      )}
      cx={centerX}
      cy={centerY - radius} // 从12点钟位置开始
      r={ballRadius} // 小球半径
      fill={isRunning ? runningColor : idleColor} // 小球颜色
      style={ballStyle}
    />
  );
};

export default RunningBall;
