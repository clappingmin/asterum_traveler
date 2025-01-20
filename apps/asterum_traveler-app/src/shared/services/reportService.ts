import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Report } from '@asterum/types';

/**
 * 리포트 가져오기
 * @return {Promise<Report[]>}
 */
export async function getReports(): Promise<Report[]> {
  try {
    const q = query(collection(db, 'reports'));

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
        reportDate: { display: data.display ?? '', usage: data.usage ?? '' },
        liveTitle: data.liveTitle ?? '',
        reportUrl: data.reportUrl ?? '',
      } as Report;
    });

    return reports;
  } catch (e) {
    return [];
  }
}
