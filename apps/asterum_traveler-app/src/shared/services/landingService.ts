import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Album, DearCard, Schedule } from '@asterum/types';
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

export async function getDiscography() {
  try {
    const imagesRef = collection(db, 'discography');

    const q = query(imagesRef);

    const querySnapshot = await getDocs(q);
    const albums: Album[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: data.id,
        albumName: data.albumName ?? '',
        releaseDate: data.releaseDate ?? '',
        imageUrl: data.imageUrl ?? '',
      } as Album;
    });

    albums.sort((a: Album, b: Album) => {
      const aDate = new Date(a.releaseDate.replace(/\./g, '-'));
      const bDate = new Date(b.releaseDate.replace(/\./g, '-'));

      if (aDate < bDate) return -1;
      else if (aDate > bDate) return 1;
      else return 0;
    });

    return albums;
  } catch (e) {
    return [];
  }
}

export async function getThreeDearCards(): Promise<DearCard[]> {
  try {
    const cardsRef = collection(db, 'cards');

    const q = query(cardsRef, orderBy('createdAt'), limit(3));

    const querySnapshot = await getDocs(q);
    const dearCards: DearCard[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: data.id,
        createdAt: data.createdAt,
        from: data.from ?? '',
        password: data.password ?? '',
        content: data.content ?? '',
        cardCoverColor: data.cardCoverColor ?? 'pink',
      } as DearCard;
    });

    return dearCards;
  } catch (e) {
    console.log(e);
    return [];
  }
}
