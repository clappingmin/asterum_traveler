import { Report, ReportType } from '@asterum/types';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface PostBoxProps {
  report: Report;
}

function PostBox({ report }: PostBoxProps) {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState<boolean>(false);

  const goToReportDetail = (reportId: string, reportType: ReportType) => {
    navigate(`${reportType}/${reportId}`);
  };

  return (
    <Wrapper
      animate={{ backgroundColor: loaded ? 'transparent' : 'var(--placeholder)' }}
      transition={{ duration: 0.7 }}
      onClick={() => goToReportDetail(report.id, report.reportType)}
    >
      <motion.img
        src={report.reportThumbnail}
        width={388}
        height={388}
        alt={'리포트 이미지'}
        loading="lazy"
        decoding="async"
        onLoad={() => {
          setLoaded(true);
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.7 }}
      />
    </Wrapper>
  );
}

export default PostBox;

const Wrapper = styled(motion.div)`
  width: 100%;
  aspect-ratio: 1;
  background-color: var(--placeholder);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  & > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
