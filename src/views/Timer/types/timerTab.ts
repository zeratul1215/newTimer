const TIMER_TABS = {
  COUNT_DOWN_TIMER: 'countDownTimer',
  STOPWATCH: 'stopwatch'
} as const;

export type TimerTab = (typeof TIMER_TABS)[keyof typeof TIMER_TABS];

export { TIMER_TABS };
