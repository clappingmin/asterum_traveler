import { Schedule, ScheduleBase } from '@asterum/types';
import { collection, doc, getDocs, query, setDoc, Timestamp, where } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../firebaseConfig';
/**
 *  스케줄 추가하기
 * @param {ScheduleBase} schedule
 * @return {Promise<string>} schedule id
 */
export async function addSchedule(schedule: ScheduleBase): Promise<string> {
  try {
    const scheduleId = uuidv4();

    await setDoc(doc(db, 'schedules', scheduleId), {
      id: scheduleId,
      ...schedule,
      createAt: Timestamp.now(),
    });

    return scheduleId;
  } catch (e) {
    throw e;
  }
}

export async function getSchedulesByDate(targetDate: Date) {
  try {
    const schedulesRef = collection(db, 'schedules');

    targetDate.setHours(0, 0, 0, 0);

    const tomorrow = new Date(targetDate);
    tomorrow.setDate(targetDate.getDate() + 1);

    const month = targetDate.getMonth() + 1;
    const day = targetDate.getDate();

    const q1 = query(
      schedulesRef,
      where('isAnniversary', '==', false),
      where('scheduleDate', '>=', targetDate),
      where('scheduleDate', '<', tomorrow)
    );

    const q2 = query(
      schedulesRef,
      where('isAnniversary', '==', true),
      where('schedule_month', '==', month),
      where('schedule_day', '==', day)
    );

    const [snapshot1, snapshot2] = await Promise.all([getDocs(q1), getDocs(q2)]);

    const schedules = new Map();

    snapshot1.forEach((doc) => schedules.set(doc.id, doc.data()));
    snapshot2.forEach((doc) => schedules.set(doc.id, doc.data()));

    // 시간순 정렬
    const schedulesArray: Schedule[] = Array.from(schedules.values());
    schedulesArray.sort((a: Schedule, b: Schedule) => {
      if (a.schedule_hour < b.schedule_hour) return -1;
      else if (a.schedule_hour > b.schedule_hour) return 1;
      else {
        if (a.schedule_minute < b.schedule_minute) return -1;
        else if (a.schedule_minute > b.schedule_minute) return 1;
        else return 0;
      }
    });

    return schedulesArray;
  } catch (e) {
    console.log(e);
  }
}
