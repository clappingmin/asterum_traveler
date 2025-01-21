import { DearCard, DearCardBase } from '@asterum/types';
import { collection, doc, getDocs, query, setDoc, Timestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../firebaseConfig';

/**
 * 디어 카드 추가하기
 * @param {DearCardBase} dearCard
 * @returns
 */
export async function addDearCard(dearCard: DearCardBase): Promise<string> {
  try {
    const cardId = uuidv4();

    await setDoc(doc(db, 'cards', cardId), {
      id: cardId,
      createdAt: Timestamp.now(),
      ...dearCard,
    } as DearCard);
    return cardId;
  } catch (e) {
    throw e;
  }
}

/**
 * 디어 카드 리스트 가져오기
 * @return {Promise<DearCard[]>}
 */
export async function getDearCards(): Promise<DearCard[]> {
  try {
    const q = query(collection(db, 'cards'));

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
    throw e;
  }
}
