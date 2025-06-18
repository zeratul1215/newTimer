import { TimerRecord } from '../types/history';

export const STORAGE_KEY = 'timer_history';

export const saveTimerRecord = (record: Omit<TimerRecord, 'id'>) => {
  const history = getTimerHistory();
  const newRecord: TimerRecord = {
    ...record,
    id: Date.now().toString()
  };
  history.unshift(newRecord);
  // 只保留最近50条记录
  const trimmedHistory = history.slice(0, 50);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedHistory));
};

export const getTimerHistory = (): TimerRecord[] => {
  const history = localStorage.getItem(STORAGE_KEY);
  return history ? JSON.parse(history) : [];
};
