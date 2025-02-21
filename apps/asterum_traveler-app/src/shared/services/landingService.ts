import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export async function getSchedulesAroundToday() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 2);

    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 2);

    const cardsRef = collection(db, 'schedules');

    const q = query(cardsRef, orderBy('createdAt'));

    const querySnapshot = await getDocs(q);
    // const dearCards: DearCard[] = querySnapshot.docs.map((doc) => {
    //   const data = doc.data();
    //   return {
    //     id: data.id,
    //     createdAt: data.createdAt,
    //     from: data.from ?? '',
    //     password: data.password ?? '',
    //     content: data.content ?? '',
    //     cardCoverColor: data.cardCoverColor ?? 'pink',
    //   } as DearCard;
    // });
  } catch (error) {}
}
