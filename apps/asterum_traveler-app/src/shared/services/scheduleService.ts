import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Schedule } from '@asterum/types';
import { sortSchedule } from '../utils';

export async function getSchedulesByDate(targetDate: Date) {
  try {
    const schedulesRef = collection(db, 'schedules');

    const year = targetDate.getFullYear();
    const month = targetDate.getMonth() + 1;

    // 현재 달 데이터
    const q1 = query(
      schedulesRef,
      where('isAnniversary', '==', false),
      where('schedules_year', '==', year),
      where('schedules_month', '==', month)
    );

    // 기념일 데이터
    const q2 = query(
      schedulesRef,
      where('isAnniversary', '==', true),
      where('schedules_month', '==', month)
    );

    // 이전 달 6일 데이터
    const prevMonthDate = new Date(year, month - 1, 0);
    const prevMonth = prevMonthDate.getMonth() + 1;
    const prevMonthYear = prevMonthDate.getFullYear();
    const prevMonthLast6DaysStart = prevMonthDate.getDate() - 5;

    const prevMonthQuery1 = query(
      schedulesRef,
      where('isAnniversary', '==', false),
      where('schedules_year', '==', prevMonthYear),
      where('schedules_month', '==', prevMonth),
      where('schedules_day', '>=', prevMonthLast6DaysStart)
    );

    const prevMonthQuery2 = query(
      schedulesRef,
      where('isAnniversary', '==', true),
      where('schedules_month', '==', prevMonth),
      where('schedules_day', '>=', prevMonthLast6DaysStart)
    );

    // 다음 달 6일 데이터
    const nextMonthDate = new Date(year, month, 1);
    const nextMonth = nextMonthDate.getMonth() + 1;
    const nextMonthYear = nextMonthDate.getFullYear();

    const nextMonthQuery1 = query(
      schedulesRef,
      where('isAnniversary', '==', false),
      where('schedules_year', '==', nextMonthYear),
      where('schedules_month', '==', nextMonth),
      where('schedules_day', '<=', 6)
    );

    const nextMonthQuery2 = query(
      schedulesRef,
      where('isAnniversary', '==', true),
      where('schedules_year', '==', nextMonthYear),
      where('schedules_month', '==', nextMonth),
      where('schedules_day', '<=', 6)
    );

    const [
      snapshotBymonth,
      snapshotByAnniversary,
      snapshotByPrevMonth,
      snapshotByPrevMonthAnniversary,
      snapshotByNextMonth,
      snapshotByNextMonthAnniversary,
    ] = await Promise.all([
      getDocs(q1),
      getDocs(q2),
      getDocs(prevMonthQuery1),
      getDocs(prevMonthQuery2),
      getDocs(nextMonthQuery1),
      getDocs(nextMonthQuery2),
    ]);

    const schedules = new Map();

    snapshotBymonth.forEach((doc) => schedules.set(doc.id, doc.data()));
    snapshotByAnniversary.forEach((doc) => schedules.set(doc.id, doc.data()));
    snapshotByPrevMonth.forEach((doc) => schedules.set(doc.id, doc.data()));
    snapshotByPrevMonthAnniversary.forEach((doc) => schedules.set(doc.id, doc.data()));
    snapshotByNextMonth.forEach((doc) => schedules.set(doc.id, doc.data()));
    snapshotByNextMonthAnniversary.forEach((doc) => schedules.set(doc.id, doc.data()));

    // 시간순 정렬
    const schedulesArray: Schedule[] = Array.from(schedules.values());
    schedulesArray.sort(sortSchedule);

    return schedulesArray;
  } catch (e) {
    console.log(e);
  }
}
