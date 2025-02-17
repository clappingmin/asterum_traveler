import { Timestamp } from 'firebase/firestore';
import { Member } from './common.interface';

export interface ScheduleBase {
  content: string;
  scheduleDate: Date | Timestamp;
  member: Member[];
}

export interface Schedule extends ScheduleBase {
  id: string;
  createdAt: Timestamp;
}
