import { Timestamp } from 'firebase/firestore';
import { Member } from './common.interface';

export type ScheduleDate = {
  schedules_year: number;
  schedules_month: number;
  schedules_day: number;
  schedules_hour: number;
  schedules_minute: number;
};

export interface ScheduleBase extends ScheduleDate {
  content: string;
  members: Member[];
  isAnniversary: boolean;
}

export interface Schedule extends ScheduleBase {
  id: string;
  createdAt: Timestamp;
}
