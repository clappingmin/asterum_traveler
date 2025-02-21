import { Schedule } from '@asterum/types';
import { Timestamp } from 'firebase/firestore';

export const timestampToDisplayDate = (createdAt: Timestamp): string => {
  const date = createdAt.toDate();
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}.${month}.${day}`;
};

export const sortSchedule = (a: Schedule, b: Schedule) => {
  if (a.schedule_hour < b.schedule_hour) return -1;
  else if (a.schedule_hour > b.schedule_hour) return 1;
  else {
    if (a.schedule_minute < b.schedule_minute) return -1;
    else if (a.schedule_minute > b.schedule_minute) return 1;
    else return 0;
  }
};

export const formatTime = (hour: number, minute: number) => {
  const period = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = String(hour > 0 ? hour % 12 : 0).padStart(2, '0');
  const formattedMinute = String(minute).padStart(2, '0'); // 두 자리수로 변환

  return `${formattedHour}:${formattedMinute} ${period}`;
};
