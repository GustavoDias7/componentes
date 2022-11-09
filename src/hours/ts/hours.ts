class Time {
  hour: number;
  minute: number;
  second: number;

  constructor() {
    this.hour = 0;
    this.minute = 0;
    this.second = 0;
  }

  setHour(hour: number) {
    this.hour = hour;
    return this;
  }

  setMinute(minute: number) {
    this.minute = minute;
    return this;
  }

  setSecond(second: number) {
    this.second = second;
    return this;
  }

  getTime() {
    return {
      hour: this.hour,
      minute: this.minute,
      second: this.second,
    };
  }
}

interface Type {
  from: Time;
  to: Time;
  days: number[];
}

function includes(array: any[], value: any): boolean {
  let isInclude = false;

  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (value === element) {
      isInclude = true;
      break;
    }
  }

  return isInclude;
}

function openingHours({ from, to, days = [] }: Type): boolean {
  const now = new Date();
  const hours = now.getHours();
  const day = now.getDay();

  const fromHour = hours >= from;
  const toHour = hours < to;
  const daysInclude = includes(days, day);

  return fromHour && toHour && daysInclude;
}

function setWeekDays(): number[] {
  const sunday = 0;
  const monday = 1;
  const tuesday = 2;
  const wednesday = 3;
  const thursday = 4;
  const friday = 5;
  const saturday = 6;

  return [monday, tuesday, wednesday, thursday, friday, saturday];
}

const fromTime = new Time();
fromTime.setHour(7).setMinute(30);
const toTime = new Time();
toTime.setHour(16).setMinute(0);

const isAvailable = openingHours({
  from: fromTime,
  to: toTime,
  days: [...setWeekDays()],
});

console.log({ isAvailable });

console.log(myTime.getTime());
