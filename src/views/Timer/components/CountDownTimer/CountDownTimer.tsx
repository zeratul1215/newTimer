import React, { useRef, useState, useEffect, useCallback } from 'react';
import cls from 'clsx';
import { observer } from 'mobx-react-lite';
import BottomBar from '@Timer/components/BottomBar';
import AddBtn from '@Timer/components/AddBtn';
import BackGroundCircle from '@Timer/components/BackGroundCircle';
import { colors } from '@Timer/constants/colors';
import ProgressCircle from '@Timer/components/ProgressCircle';
import { pad } from '@Timer/utils/format';
import timerStore from '@Store/modules/timer';
import styles from './CountDownTimer.module.css';

const TIME_FORMAT_REGEX = /(\d{2})(\d{2})(\d{2})/;
const MAX_TIME_SECONDS = 99 * 3600 * 10 + 59 * 60 * 10 + 59 * 10; // 99:59:59 in tenths of seconds

interface CountDownTimerProps {
  active: boolean;
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
  shouldReset: boolean;
  setShouldReset: (shouldReset: boolean) => void;
}

const CountDownTimer = observer(
  ({
    active,
    isRunning,
    setIsRunning,
    shouldReset,
    setShouldReset
  }: CountDownTimerProps) => {
    const [editingTime, setEditingTime] = useState(false);
    const [isTimeUp, setIsTimeUp] = useState(false);

    // inputValue 始终为6位数字字符串
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
      if (isRunning && timerStore.CountDownSeconds > 0) {
        //切换成运行状态，为计时器设置定时器
        intervalRef.current = setInterval(() => {
          timerStore.setCountDownSeconds(timerStore.CountDownSeconds - 1);
        }, 100);
      } else if (!isRunning && intervalRef.current) {
        //切换成非运行状态，为计时器清楚定时器，防止内存泄漏
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }, [isRunning]);

    useEffect(() => {
      if (timerStore.CountDownSeconds == 0) {
        //当时间归零的时候，判断是否是由于倒计时归零，
        setIsTimeUp(true);
        if (isRunning) {
          setShouldReset(true);
          setIsRunning(false);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      } else {
        if (isTimeUp) {
          setIsTimeUp(false);
          if (shouldReset) {
            setShouldReset(false);
          }
        }
      }
    }, [isTimeUp, shouldReset, isRunning, setIsRunning, setShouldReset]);

    // 时间格式化 用来显示非编辑状态下的时间
    const formatTime = useCallback((s: number) => {
      //将秒数转换为hh:mm:ss格式
      s = Math.ceil(s / 10);
      const h = Math.floor(s / 3600);
      const m = Math.floor((s % 3600) / 60);
      const sec = s % 60;

      if (h !== 0) {
        if (h > 9) {
          return `${pad(h, 2)}:${pad(m, 2)}:${pad(sec, 2)}`;
        } else {
          return `${pad(h, 1)}:${pad(m, 2)}:${pad(sec, 2)}`;
        }
      } else {
        if (m !== 0) {
          if (m > 9) {
            return `${pad(m, 2)}:${pad(sec, 2)}`;
          } else {
            return `${pad(m, 1)}:${pad(sec, 2)}`;
          }
        } else {
          if (sec > 9) {
            return `${pad(sec, 2)}`;
          } else {
            return `${pad(sec, 1)}`;
          }
        }
      }
    }, []);

    // 解析 hhmmss 字符串为秒
    const parseTime = useCallback((str: string) => {
      //将用户输入的时间转化为秒数
      if (!/^\d{6}$/.test(str)) return null; //如果字符串不是六位数字，返回null
      const h = parseInt(str.slice(0, 2), 10); //
      const m = parseInt(str.slice(2, 4), 10);
      const s = parseInt(str.slice(4, 6), 10);
      return (h * 3600 + m * 60 + s) * 10;
    }, []);

    // 圆环动画参数
    const radius = 180;
    // const circumference = 2 * Math.PI * radius;
    // const progress = 1 - seconds / rememberedSeconds;
    // const offset = circumference * progress;

    // 按钮事件
    const handleStart = useCallback(() => {
      if (!isTimeUp) {
        setIsRunning(true);
      }
    }, [isTimeUp, setIsRunning]);

    const handlePause = useCallback(() => setIsRunning(false), [setIsRunning]);

    const handleReset = useCallback(() => {
      if (shouldReset) {
        setShouldReset(false);
      }
      setIsRunning(false);
      timerStore.setCountDownSeconds(timerStore.CountDownRememberedSeconds);
    }, [shouldReset, setIsRunning, setShouldReset]);

    const handleAdd = useCallback((addSec: number) => {
      timerStore.setCountDownSeconds(timerStore.CountDownSeconds + addSec * 10);
      timerStore.setCountDownRememberedSeconds(
        timerStore.CountDownRememberedSeconds + addSec * 10
      );
    }, []);

    // 编辑时间相关
    const handleTimeClick = useCallback(() => {
      if (!isRunning) {
        // 转成6位数字字符串
        const tempSeconds = Math.ceil(timerStore.CountDownSeconds / 10);
        const h = Math.floor(tempSeconds / 3600);
        const m = Math.floor((tempSeconds % 3600) / 60);
        const s = tempSeconds % 60;
        setInputValue(`${pad(h, 2)}${pad(m, 2)}${pad(s, 2)}`); //统一无论小时和分钟
        setEditingTime(true);
        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
      }
    }, [isRunning]);

    const handleInputBlur = useCallback(() => {
      const parsed = parseTime(inputValue);
      if (parsed !== null && parsed >= 0 && parsed <= MAX_TIME_SECONDS) {
        timerStore.setCountDownSeconds(parsed);
        timerStore.setCountDownRememberedSeconds(parsed);
      }
      setEditingTime(false);
    }, [inputValue, parseTime]);

    const handleInputChange = useCallback(() => {
      // 禁止直接编辑
      return;
    }, []);

    const handleInputKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key >= '0' && e.key <= '9') {
          // 输入数字，左移一位，末尾加新数字
          setInputValue(prev => {
            const newVal = prev.slice(1) + e.key;
            return newVal;
          });
          e.preventDefault();
        } else if (e.key === 'Backspace') {
          // 退格，右移一位，前面补0
          setInputValue(prev => {
            const newVal = '0' + prev.slice(0, 5);
            return newVal;
          });
          e.preventDefault();
        } else if (e.key === 'Enter') {
          inputRef.current?.blur();
        } else {
          e.preventDefault();
        }
      },
      [inputRef]
    );

    // 渲染inputValue为hh:mm:ss
    const renderInputValue = useCallback(
      (val: string) => val.replace(TIME_FORMAT_REGEX, '$1:$2:$3'),
      []
    );

    return (
      <div className={cls(active ? styles.show : styles.dontShow)}>
        <div
          className={cls(
            styles.timerContainer,
            isRunning ? styles.timerContainerRunning : styles.timerContainerIdle
          )}
          onClick={() => {
            if (isRunning) {
              handlePause();
            }
          }}
        >
          <svg width={400} height={400} className={styles.circleSvg}>
            {/* 背景 */}
            <BackGroundCircle
              radius={radius}
              isRunning={isRunning}
              runningColor={colors.background.running}
              idleColor={colors.background.idle}
              centerX={200}
              centerY={200}
            />
            {/* 进度条 */}
            <ProgressCircle
              radius={radius}
              isRunning={isRunning}
              totalTime={timerStore.CountDownRememberedSeconds}
              passedTime={timerStore.CountDownSeconds}
              centerX={200}
              centerY={200}
              strokeWidth={10}
              runningColor={colors.progress.running}
              idleColor={colors.progress.idle}
            />
          </svg>
          <div className={styles.centerContent}>
            {isRunning ? (
              <div className={styles.timeText}>
                {formatTime(timerStore.CountDownSeconds)}
              </div>
            ) : shouldReset ? (
              <div className={styles.timeText} onClick={handleReset}>
                {formatTime(timerStore.CountDownSeconds)}
              </div>
            ) : (
              <div
                className={cls(
                  styles.timeText,
                  editingTime ? '' : styles.timeTextCanSet
                )}
                onClick={handleTimeClick}
                tabIndex={0}
              >
                {editingTime ? (
                  <input
                    ref={inputRef}
                    className={styles.timeInput}
                    value={renderInputValue(inputValue)}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onKeyDown={handleInputKeyDown}
                    maxLength={8}
                  />
                ) : (
                  formatTime(timerStore.CountDownSeconds)
                )}
              </div>
            )}
            {!isRunning && (
              <div className={styles.addBtns}>
                <AddBtn seconds={30} onClick={handleAdd} />
                <AddBtn seconds={60} onClick={handleAdd} />
              </div>
            )}
          </div>
        </div>
        <BottomBar
          canReset={
            timerStore.CountDownSeconds !==
            timerStore.CountDownRememberedSeconds
          }
          shouldReset={shouldReset}
          isRunning={isRunning}
          handlePause={handlePause}
          handleStart={handleStart}
          handleReset={handleReset}
        />
      </div>
    );
  }
);

CountDownTimer.displayName = 'CountDownTimer';

export default CountDownTimer;
