import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Schedule } from '@asterum/types';
import { sortSchedule } from '../utils';

export async function getSchedulesByDate(targetDate: Date) {
  try {
    const schedulesRef = collection(db, 'schedules');

    const month = targetDate.getMonth() + 1;

    const startOfLastMonth = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      -5,
      0,
      0,
      0,
      0
    );
    const endOfNextMonth = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth() + 1,
      6,
      23,
      59,
      59,
      999
    );

    // 현재 달 데이터 +- 6일
    const q1 = query(
      schedulesRef,
      where('isAnniversary', '==', false),
      where('scheduleDate', '>=', startOfLastMonth),
      where('scheduleDate', '<=', endOfNextMonth)
    );

    // 기념일 데이터
    const q2 = query(
      schedulesRef,
      where('isAnniversary', '==', true),
      where('schedule_month', '==', month)
    );

    const [snapshotBymonth, snapshotByAnniversary] = await Promise.all([getDocs(q1), getDocs(q2)]);

    const schedules = new Map();

    snapshotBymonth.forEach((doc) => schedules.set(doc.id, doc.data()));
    snapshotByAnniversary.forEach((doc) => schedules.set(doc.id, doc.data()));

    // 시간순 정렬
    const schedulesArray: Schedule[] = Array.from(schedules.values());
    schedulesArray.sort(sortSchedule);

    return schedulesArray;
  } catch (e) {
    console.log(e);
  }
}
