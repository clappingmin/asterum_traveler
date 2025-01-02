import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div>
      랜딩
      <Link to="/report">리포트 페이지로</Link>
    </div>
  );
}

export default LandingPage;
