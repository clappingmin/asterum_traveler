import { Timestamp } from 'firebase/firestore';
import { Member } from './common.interface';

export type ScheduleDate = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
};

export interface ScheduleBase {
  content: string;
  scheduleDate: ScheduleDate;
  members: Member[];
  isAnniversary: boolean;
}

export interface Schedule extends ScheduleBase {
  id: string;
  createdAt: Timestamp;
}
