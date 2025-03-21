import { Link } from '@/renderer/Link';
import { Report } from '@asterum/types';
import { motion } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';

interface PostBoxProps {
  report: Report;
}

function PostBox({ report }: PostBoxProps) {
  const [loaded, setLoaded] = useState<boolean>(false);

  return (
    <Link href={`report/${report.reportType}/${report.id}`}>
      <Wrapper
        initial={{ backgroundColor: 'var(--placeholder)' }}
        animate={{ backgroundColor: loaded ? 'transparent' : 'var(--placeholder)' }}
        transition={{ duration: 0.7 }}
      >
        <motion.img
          src={report.reportThumbnail}
          width={388}
          height={388}
          alt={'ASTERUM TRAVELER 리포트 썸네일'}
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
    </Link>
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
