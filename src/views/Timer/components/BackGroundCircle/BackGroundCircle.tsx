import styles from './BackGroundCircle.module.css';

const BackGroundCircle = ({
  radius,
  isRunning,
  runningColor,
  idleColor,
  centerX,
  centerY,
  strokeWidth
}: {
  radius: number;
  isRunning: boolean;
  runningColor?: string;
  idleColor?: string;
  centerX?: number;
  centerY?: number;
  strokeWidth?: number;
}) => {
  return (
    <circle
      className={styles.backgroundCircle}
      cx={centerX}
      cy={centerY}
      r={radius}
      fill="none"
      stroke={isRunning ? runningColor : idleColor}
      strokeWidth={strokeWidth}
    />
  );
};

export default BackGroundCircle;
