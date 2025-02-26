import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Product, Report, ReportCategory } from '@asterum/types';

/**
 * 리포트 가져오기
 * @return {Promise<Report[]>}
 */
export async function getReportsByCategory(category: ReportCategory | 'all'): Promise<Report[]> {
  try {
    const reportsRef = collection(db, 'reports');

    const q =
      category === 'all'
        ? query(reportsRef, orderBy('reportDateUsage', 'desc'))
        : query(
            reportsRef,
            where('category', 'array-contains', category),
            orderBy('reportDateUsage', 'desc')
          );

    const querySnapshot = await getDocs(q);
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

    return reports;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function getReportById(reportId: string): Promise<Report> {
  try {
    const docRef = doc(db, 'reports', reportId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as Report;
    } else {
      // TODO: 에러 처리
      throw new Error('Get Data Error!!');
    }
  } catch (e) {
    throw e;
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

    if (docSnap.exists()) {
      return docSnap.data() as Product;
    } else {
      // TODO: 에러 처리
      throw new Error('Get Data Error!!');
    }
  } catch (e) {
    throw e;
  }
}
