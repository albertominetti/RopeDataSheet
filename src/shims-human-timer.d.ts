declare interface Timer {
  seconds?: number;
  zeroes?: boolean;
  onTick?: () => void;
  onEnd?: () => void;
}

declare class HumanTimer {
  constructor(timer: Timer);
  restart(): void;
  start(): void;
  stop(): void;
}

declare module "human-timer" {
  export default HumanTimer;
}
