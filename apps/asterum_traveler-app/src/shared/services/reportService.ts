import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Report, ReportCategory } from '@asterum/types';

/**
 * 리포트 가져오기
 * @return {Promise<Report[]>}
 */
export async function getReportsByCategory(category: ReportCategory | 'all'): Promise<Report[]> {
  try {
    const reportsRef = collection(db, 'reports');

    const q =
      category === 'all' ? query(reportsRef) : query(reportsRef, where('category', '==', category));

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
