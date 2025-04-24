import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  Timestamp,
  where,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Product, Report } from '@asterum/types';
import { getErrorMessage, getRowCountForInfiniteScroll } from '../utils';
import { InfiniteQueryEmptyReturn } from '../constants';
import { ApiError, ERROR_NO_DATA } from '../errors';

/**
 * 리포트 가져오기
 */
export async function getReportsByCategory({
  pageParam,
  queryKey,
}: {
  pageParam: QueryDocumentSnapshot<DocumentData, DocumentData> | null;
  queryKey: string[];
}) {
  try {
    const PAGE_COUNT = getRowCountForInfiniteScroll() * 4;
    const [_key, category] = queryKey;

    const reportsRef = collection(db, 'reports');

    let q =
      category === 'all'
        ? query(
            reportsRef,
            orderBy('reportDateUsage', 'desc'),
            limit(PAGE_COUNT)
          )
        : query(
            reportsRef,
            where('category', 'array-contains', category),
            orderBy('reportDateUsage', 'desc'),
            limit(PAGE_COUNT)
          );

    if (pageParam) q = query(q, startAfter(pageParam));

    const querySnapshot = await getDocs(q);

    // 데이터가 비었을 때
    if (querySnapshot.empty) return InfiniteQueryEmptyReturn;

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    const reports: Report[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        reportType: data.reportType ?? '',
        category: data.category ?? 'etc',
        reportMembers: data.reportMembers ?? [],
        reportThumbnail: data.reportThumbnail ?? '',
        includedProducts: data.includedProducts ?? [],
        reportDateDisplay: data.reportDateDisplay ?? '',
        reportDateUsage: data.reportDateUsage ?? Timestamp.now(),
        liveTitle: data.liveTitle ?? '',
        reportUrl: data.reportUrl ?? '',
      } as Report;
    });

    return { data: reports, lastVisible };
  } catch (e: unknown) {
    throw new ApiError(getErrorMessage(e), 'getReportsByCategory', true);
  }
}

export async function getReportById(reportId: string): Promise<Report> {
  try {
    const docRef = doc(db, 'reports', reportId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) return docSnap.data() as Report;
    else throw new Error(ERROR_NO_DATA);
  } catch (e: unknown) {
    throw new ApiError(getErrorMessage(e), 'getReportById', false);
  }
}

/**
 * 제품 아이디로 제품 가져오기
 * @param productId
 * @returns
 */
export async function getProdcutById(productId: string): Promise<Product> {
  try {
    const docRef = doc(db, 'products', productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) return docSnap.data() as Product;
    else throw new Error(ERROR_NO_DATA);
  } catch (e: unknown) {
    const errorMessage = getErrorMessage(e);
    throw new ApiError(
      errorMessage,
      'getProdcutById',
      errorMessage !== ERROR_NO_DATA
    );
  }
}
