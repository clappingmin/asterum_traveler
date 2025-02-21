import { ScheduleDate } from '@asterum/types';
import { Timestamp } from 'firebase/firestore';

// date-local string Timestamp로 변경
export const localStringToTimestamp = (localString: string) => {
  const date = new Date(localString);

  return Timestamp.fromDate(date);
};

export const localStringToScheduleDate = (localString: string): ScheduleDate => {
  const date = new Date(localString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return {
    schedule_year: year,
    schedule_month: month,
    schedule_day: day,
    schedule_hour: hour,
    schedule_minute: minute,
  };
};

export const getTimeFromTimestamp = (timestamp: Timestamp): string => {
  const date = timestamp.toDate();

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
};

export const formatDate = (dateString: string): string => {
  return dateString.replace(/-/g, '.');
};
