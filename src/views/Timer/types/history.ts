import { TimerTab } from './timerTab';

export interface TimerRecord {
  id: string;
  time: number;
  formattedTime: string;
  type: TimerTab;
  date: string;
}
