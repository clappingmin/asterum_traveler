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

export async function getSchedulesByDate(targetDate: Date) {
  try {
    const schedulesRef = collection(db, 'schedules');

    const startDate = new Date(targetDate);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(targetDate);
    endDate.setHours(23, 59, 59, 59);

    const q = query(
      schedulesRef,
      where('scheduleDate', '>=', startDate),
      where('scheduleDate', '<=', endDate)
    );

    const querySnapshot = await getDocs(q);
    const schedules: Schedule[] = querySnapshot.docs.map((doc) => ({
      id: doc.data().id,
      createdAt: doc.data().createAt,
      content: doc.data().content,
      scheduleDate: doc.data().scheduleDate,
      members: doc.data().members,
    }));

    return schedules;
  } catch (e) {}
}
