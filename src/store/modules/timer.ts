import { action, observable } from 'mobx';

const storage = localStorage;
const CountDownRunning = 'isCountDownTimerRunning';
const StopwatchRunning = 'isStopwatchRunning';
const ShouldReset = 'shouldReset';
const CountDownSeconds = 'countDownSeconds';
const StopwatchSeconds = 'stopwatchSeconds';
const CountDownRememberedSeconds = 'countDownRememberedSeconds';

const INITIAL_SECONDS = 300 * 10;

export class timerStore {
  @observable accessor CountDownRunning =
    storage.getItem(CountDownRunning) === 'true';
  @observable accessor StopwatchRunning =
    storage.getItem(StopwatchRunning) === 'true';
  @observable accessor ShouldReset = storage.getItem(ShouldReset) === 'true';

  @observable accessor CountDownSeconds = storage.getItem(CountDownSeconds)
    ? parseInt(storage.getItem(CountDownSeconds) || '0')
    : INITIAL_SECONDS;
  @observable accessor CountDownRememberedSeconds = storage.getItem(
    CountDownRememberedSeconds
  )
    ? parseInt(storage.getItem(CountDownRememberedSeconds) || '0')
    : INITIAL_SECONDS;

  @observable accessor StopwatchSeconds = storage.getItem(StopwatchSeconds)
    ? parseInt(storage.getItem(StopwatchSeconds) || '0')
    : 0;

  @action
  setCountDownRunning(value: boolean) {
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
  setCountDownSeconds(value: number) {
    try {
      storage.setItem(CountDownSeconds, value.toString());
    } finally {
      this.CountDownSeconds = value;
    }
  }

  @action
  setCountDownRememberedSeconds(value: number) {
    try {
      storage.setItem(CountDownRememberedSeconds, value.toString());
    } finally {
      this.CountDownRememberedSeconds = value;
    }
  }

  @action
  setStopwatchSeconds(value: number) {
    try {
      storage.setItem(StopwatchSeconds, value.toString());
    } finally {
      this.StopwatchSeconds = value;
    }
  }
}

export default new timerStore();
