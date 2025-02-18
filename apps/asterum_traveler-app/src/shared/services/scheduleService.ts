import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Schedule } from '@asterum/types';
import { sortSchedule } from '../utils';

export async function getSchedulesByDate(targetDate: Date) {
  try {
    const schedulesRef = collection(db, 'schedules');

    const year = targetDate.getFullYear();
    const month = targetDate.getMonth() + 1;

    const q1 = query(
      schedulesRef,
      where('isAnniversary', '==', false),
      where('schedules_year', '==', year),
      where('schedules_month', '==', month)
    );

    const q2 = query(
      schedulesRef,
      where('isAnniversary', '==', true),
      where('schedules_month', '==', month)
    );

    const [snapshot1, snapshot2] = await Promise.all([getDocs(q1), getDocs(q2)]);

    const schedules = new Map();

    snapshot1.forEach((doc) => schedules.set(doc.id, doc.data()));
    snapshot2.forEach((doc) => schedules.set(doc.id, doc.data()));

    // 시간순 정렬
    const schedulesArray: Schedule[] = Array.from(schedules.values());
    schedulesArray.sort(sortSchedule);

    return schedulesArray;
  } catch (e) {}
}
