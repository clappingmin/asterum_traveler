import { DearCard, DearCardBase } from '@asterum/types';
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  setDoc,
  startAfter,
  Timestamp,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../firebaseConfig';
import { getRowCountForInfiniteScroll } from '../utils';

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
 */
export async function getDearCards({
  pageParam,
}: {
  pageParam: QueryDocumentSnapshot<DocumentData, DocumentData> | null;
}) {
  try {
    const PAGE_COUNT = getRowCountForInfiniteScroll() * 4;

    const cardsRef = collection(db, 'cards');

    let q = query(cardsRef, orderBy('createdAt', 'desc'), limit(PAGE_COUNT));

    if (pageParam) {
      q = query(q, startAfter(pageParam));
    }

    const querySnapshot = await getDocs(q);
    const lastPage = querySnapshot.docs[querySnapshot.docs.length - 1];

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

    return { data: dearCards, lastPage };
  } catch (e) {
    throw e;
  }
}

/**
 * 디어카드 삭제하기
 * @param {string} cardId
 * @return {Promise<boolean>}
 */
export async function deleteDearCardByCardId(cardId: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, 'cards', cardId));

    return true;
  } catch (e) {
    throw e;
  }
}
