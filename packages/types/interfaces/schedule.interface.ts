import { Timestamp } from 'firebase/firestore';
import { Member } from './common.interface';

export interface ScheduleBase {
  content: string;
  scheduleDate: Date | Timestamp;
  members: Member[];
}

export interface Schedule extends ScheduleBase {
  id: string;
  createdAt: Timestamp;
}
