import { ScheduleBase } from '@asterum/types';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
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

    console.log(schedule);

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
