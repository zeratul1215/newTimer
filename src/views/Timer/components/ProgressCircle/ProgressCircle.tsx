import styles from './ProgressCircle.module.css';

const ProgressCircle = ({
  radius,
  isRunning,
  totalTime,
  passedTime,
  centerX = 200,
  centerY = 200,
  strokeWidth = 10,
  runningColor = '#90caf9',
  idleColor = '#ffe082'
}: {
  radius: number;
  isRunning: boolean;
  totalTime: number;
  passedTime: number;
  centerX?: number;
  centerY?: number;
  strokeWidth?: number;
  runningColor?: string;
  idleColor?: string;
}) => {
  const circumference = 2 * Math.PI * radius;
  const progress = 1 - passedTime / totalTime;
  const offset = circumference * progress;

  return (
    <circle
      className={styles.progressCircle}
      cx={centerX}
      cy={centerY}
      r={radius}
      fill="none"
      stroke={isRunning ? runningColor : idleColor}
      strokeWidth={strokeWidth}
      strokeDasharray={circumference}
      strokeDashoffset={offset}
    />
  );
};

export default ProgressCircle;
