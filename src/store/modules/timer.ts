import { action, observable } from 'mobx';

const storage = localStorage;
const CountDownRunning = 'isCountDownTimerRunning';
const StopwatchRunning = 'isStopwatchRunning';
const ShouldReset = 'shouldReset';

export class timerStore {
  @observable accessor CountDownRunning =
    storage.getItem(CountDownRunning) === 'true' ? true : false || false;
  @observable accessor StopwatchRunning =
    storage.getItem(StopwatchRunning) === 'true' ? true : false || false;
  @observable accessor ShouldReset =
    storage.getItem(ShouldReset) === 'true' ? true : false || false;

  @action
  setCountDownRunning(value: boolean) {
    console.log('accessed');
    try {
      storage.setItem(CountDownRunning, value.toString());
    } finally {
      this.CountDownRunning = value;
    }
  }

  @action
  setStopwatchRunning(value: boolean) {
    try {
      storage.setItem(StopwatchRunning, value.toString());
    } finally {
      this.StopwatchRunning = value;
    }
  }

  @action
  setShouldReset(value: boolean) {
    try {
      storage.setItem(ShouldReset, value.toString());
    } finally {
      this.ShouldReset = value;
    }
  }

  @action
  getCountDownRunning() {
    return this.CountDownRunning;
  }

  @action
  getStopwatchRunning() {
    return this.StopwatchRunning;
  }

  @action
  getShouldReset() {
    return this.ShouldReset;
  }
}

export default new timerStore();
