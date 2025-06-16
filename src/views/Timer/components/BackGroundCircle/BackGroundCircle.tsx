import styles from './BackGroundCircle.module.css';

const BackGroundCircle = ({
  radius,
  isRunning,
  runningColor,
  idleColor,
  centerX = 200,
  centerY = 200
}: {
  radius: number;
  isRunning: boolean;
  runningColor?: string;
  idleColor?: string;
  centerX?: number;
  centerY?: number;
}) => {
  return (
    <circle
      className={styles.backgroundCircle}
      cx={centerX}
      cy={centerY}
      r={radius}
      fill="none"
      stroke={isRunning ? runningColor : idleColor}
      strokeWidth={10}
    />
  );
};

export default BackGroundCircle;
