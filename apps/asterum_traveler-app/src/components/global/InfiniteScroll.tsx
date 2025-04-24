import { motion } from 'framer-motion';
import React, { RefObject, useEffect, useRef } from 'react';
import styled from 'styled-components';
import logo from '@/assets/images/logos/logo_small.svg';

const OPTIONS = {
  rootMargin: '10px', // 바깥 여백(Margin)을 이용해 Root 범위를 확장하거나 축소할 수 있음
  threshold: 1.0, // observer의 콜백이 실행될 대상 요소의 가시성 퍼센티지를 나타내는 단일 숫자 혹은 숫자 배열
};

interface InfiniteScrollProps {
  parent?: RefObject<HTMLDivElement | null>;
  fetchFn: () => void;
  isLoaded: boolean;
  isLastPage: boolean;
}

function InfiniteScroll({ parent, fetchFn, isLoaded, isLastPage }: InfiniteScrollProps) {
  const targetRef = useRef(null);
  const defaultRoot = document.querySelector('#scrollRoot');

  useEffect(() => {
    if (!targetRef.current || isLoaded) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchFn();
        }
      },
      { root: parent ? parent.current : defaultRoot, ...OPTIONS }
    );

    observer.observe(targetRef.current);
    return () => observer.disconnect();
  }, [targetRef, isLoaded]);

  return (
    <Target ref={targetRef}>
      {!isLastPage && isLoaded && (
        <LoadingIcon
          src={logo}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          alt="로딩 중 아이콘"
        />
      )}
    </Target>
  );
}

const Target = styled.div`
  width: 100%;
  min-height: 128px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingIcon = styled(motion.img)`
  width: 48px;
  height: 48px;
  margin: 64px 0;
`;

export default React.memo(InfiniteScroll);
