export interface TimerRecord {
  id: string;
  time: number;
  formattedTime: string;
  type: 'countdown' | 'stopwatch';
  date: string;
}
