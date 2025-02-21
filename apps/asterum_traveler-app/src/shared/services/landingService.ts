import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Schedule } from '@asterum/types';
import { sortSchedule } from '../utils';

export async function getSchedulesAroundToday() {
  try {
    const today = new Date();
    const month = today.getMonth() + 1;
    today.setHours(0, 0, 0, 0);

    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 2);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 2);
    endDate.setHours(23, 59, 59, 999);

    const schedulesRef = collection(db, 'schedules');

    const q1 = query(
      schedulesRef,
      where('isAnniversary', '==', false),
      where('scheduleDate', '>=', startDate),
      where('scheduleDate', '<=', endDate)
    );

    // 기념일 데이터 (달 기준으로 전체 들고 오기)
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
  } catch (error) {}
}
