import { useRef, useState, useEffect, useCallback } from 'react';
import styles from './timer.module.css';
import cls from 'clsx';
import { Button } from '@linktivity/link-ui';

const INITIAL_SECONDS = 5 * 60 * 10; // 5分钟

function pad(num: number, len: number) {
  return num.toString().padStart(len, '0');
}

const Timer = () => {
  const [seconds, setSeconds] = useState(INITIAL_SECONDS);
  const [rememberedSeconds, setRememberedSeconds] = useState(INITIAL_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [editingTime, setEditingTime] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [shouldReset, setShouldReset] = useState(false);

  // inputValue 始终为6位数字字符串
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 计时逻辑
  useEffect(() => {
    if (isRunning && seconds > 0) {
      //切换成运行状态，为计时器设置定时器
      intervalRef.current = setInterval(() => {
        setSeconds(prev => (prev > 0 ? prev - 1 : 0));
      }, 100);
    } else if (!isRunning && intervalRef.current) {
      //切换成非运行状态，为计时器清楚定时器，防止内存泄漏
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, seconds]);

  useEffect(() => {
    if (seconds == 0) {
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
  }, [seconds, isTimeUp, shouldReset, isRunning]);

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
  const circumference = 2 * Math.PI * radius;
  const progress = 1 - seconds / rememberedSeconds;
  const offset = circumference * progress;

  // 按钮事件
  const handleStart = useCallback(() => {
    if (!isTimeUp) {
      setIsRunning(true);
    }
  }, [isTimeUp]);
  const handlePause = useCallback(() => setIsRunning(false), []);

  const handleReset = useCallback(() => {
    if (shouldReset) {
      setShouldReset(false);
    }
    setIsRunning(false);
    setSeconds(rememberedSeconds);
  }, [rememberedSeconds, shouldReset]);

  const handleAdd = useCallback((addSec: number) => {
    setSeconds(prev => prev + addSec);
    setRememberedSeconds(prev => prev + addSec);
  }, []);

  // 编辑时间相关
  const handleTimeClick = useCallback(() => {
    if (!isRunning) {
      // 转成6位数字字符串
      const tempSeconds = Math.ceil(seconds / 10);
      console.log(tempSeconds);
      const h = Math.floor(tempSeconds / 3600);
      const m = Math.floor((tempSeconds % 3600) / 60);
      const s = tempSeconds % 60;
      setInputValue(`${pad(h, 2)}${pad(m, 2)}${pad(s, 2)}`); //统一无论小时和分钟
      setEditingTime(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [seconds, isRunning]);

  const handleInputBlur = useCallback(() => {
    const parsed = parseTime(inputValue);
    if (
      parsed !== null &&
      parsed >= 0 &&
      parsed <= 99 * 3600 * 10 + 59 * 60 * 10 + 59 * 10
    ) {
      setSeconds(parsed);
      setRememberedSeconds(parsed);
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
    (val: string) => val.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3'),
    []
  );

  return (
    <div
      className={cls(
        styles.wholeContainer,
        isRunning
          ? styles.wholeContainerRunning
          : shouldReset
            ? styles.wholeContainerShouldReset
            : styles.wholeContainerIdle
      )}
    >
      <div className={styles.topBar}>
        <span className={styles.tabActive}>タイマー</span>
        <span className={styles.tab}>ストップウォッチ</span>
      </div>
      <div
        className={styles.timerContainer}
        style={{
          cursor: isRunning ? 'pointer' : 'default'
        }}
        onClick={() => {
          console.log(isRunning);
          if (isRunning) {
            handlePause();
          }
        }}
      >
        <svg width={400} height={400} className={styles.circleSvg}>
          {/* 背景 */}
          <circle
            cx={200}
            cy={200}
            r={radius}
            fill="none"
            stroke={isRunning ? '#0d47a1' : '#8d6e63'}
            strokeWidth={10}
            style={{
              transition: 'stroke 0.5s ease'
            }}
          />
          {/* 进度条 */}
          <circle
            cx={200}
            cy={200}
            r={radius}
            fill="none"
            stroke={isRunning ? '#90caf9' : '#ffe082'}
            strokeWidth={10}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%',
              transition: 'stroke-dashoffset 0.1s linear, stroke 0.5s ease'
            }}
          />
        </svg>
        <div className={styles.centerContent}>
          {isRunning ? (
            <div className={styles.timeText}>{formatTime(seconds)}</div>
          ) : (
            <div
              className={styles.timeText}
              onClick={handleTimeClick}
              tabIndex={0}
              style={{ cursor: 'pointer' }}
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
                  style={{
                    fontSize: 'inherit',
                    fontWeight: 'inherit',
                    color: 'inherit',
                    textAlign: 'center',
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    width: '10ch'
                  }}
                />
              ) : (
                formatTime(seconds)
              )}
            </div>
          )}
          {!isRunning && (
            <div className={styles.addBtns}>
              <Button
                className={styles.addBtn}
                onClick={() => handleAdd(30 * 10)}
              >
                +0:30
              </Button>
              <Button
                className={styles.addBtn}
                onClick={() => handleAdd(60 * 10)}
              >
                +1:00
              </Button>
            </div>
          )}
        </div>
      </div>
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
    </div>
  );
};

export default Timer;
