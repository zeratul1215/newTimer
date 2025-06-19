import styles from './RunningBall.module.css';
import { useEffect } from 'react';

const RunningBall = ({
  isRunning,
  radius,
  runningColor,
  idleColor,
  centerX = 200,
  centerY = 200,
  ballRadius = 10,
  currentTime = 0,
  totalTime = 400
}: {
  isRunning: boolean;
  radius: number;
  runningColor?: string;
  idleColor?: string;
  centerX?: number;
  centerY?: number;
  ballRadius?: number;
  currentTime?: number;
  totalTime?: number;
}) => {
  const rotationAngle = (currentTime / (totalTime * 100)) * 360;

  useEffect(() => {
    console.log(rotationAngle);
  }, [rotationAngle]);

  const ballStyle = {
    transform: `rotate(${rotationAngle}deg)`
  } as React.CSSProperties;

  return (
    <circle
      className={styles.movingBall}
      cx={centerX}
      cy={centerY - radius} // 从12点钟位置开始
      r={ballRadius} // 小球半径
      fill={isRunning ? runningColor : idleColor} // 小球颜色
      style={ballStyle}
    />
  );
};

export default RunningBall;
