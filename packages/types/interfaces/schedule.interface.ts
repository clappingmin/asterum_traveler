import { Timestamp } from 'firebase/firestore';
import { Member } from './common.interface';

export type ScheduleDate = {
  schedule_year: number;
  schedule_month: number;
  schedule_day: number;
  schedule_hour: number;
  schedule_minute: number;
};

export interface ScheduleBase extends ScheduleDate {
  content: string;
  members: Member[];
  isAnniversary: boolean;
  scheduleDate: Timestamp;
}

export interface Schedule extends ScheduleBase {
  id: string;
  createdAt: Timestamp;
}
