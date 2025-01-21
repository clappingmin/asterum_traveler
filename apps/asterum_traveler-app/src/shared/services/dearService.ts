import { DearCard, DearCardBase } from '@asterum/types';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
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
