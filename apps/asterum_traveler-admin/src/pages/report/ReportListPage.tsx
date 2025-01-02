import { Link } from 'react-router-dom';

function ReportListPage() {
  return (
    <div>
      리포트 리스트 보기 페이지 전체 / 제품 / 리포트 나눠서 보기
      <Link to={'edit/product'}>제품 추가하기</Link>
      <Link to={'edit/report'}>리포트 추가하기</Link>
    </div>
  );
}

export default ReportListPage;
