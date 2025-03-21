import styled from 'styled-components';
import LogoLarge from '@/assets/images/logos/logo_large.svg';
import LogoSmall from '@/assets/images/logos/logo_small.svg';
import { RefObject, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HeaderBg } from '@/shared/interfaces/common.interface';
import { usePageContext } from '@/renderer/usePageContext';
import { Link } from '@/renderer/Link';

interface HeaderProps {
  scrollTarget: RefObject<HTMLDivElement | null>;
}

function Header({ scrollTarget }: HeaderProps) {
  const { urlPathname } = usePageContext();

  const [currentPath, setCurrentPath] = useState('');
  const [headerBg, setHeaderBg] = useState<HeaderBg>('transparent');

  /**
   * 헤더 배경색상 설정
   * @param {string} path
   * @param {number} scrollTop
   * @return {HeaderBg}
   */
  const getHeaderBg = (path: string, scrollTop: number): HeaderBg => {
    // 랜딩
    if (path === '/') {
      if (scrollTop > 1080) return 'rgba(0,0,0,0.5)';
      return 'transparent';
    }

    // 랜딩 제외
    if (scrollTop > 128) return 'rgba(0,0,0,0.5)';
    return 'transparent';
  };

  useEffect(() => {
    const path = urlPathname || '';
    setCurrentPath(path);
    setHeaderBg('transparent');
  }, [urlPathname]);

  useEffect(() => {
    const wrapper = scrollTarget.current;

    const handleScroll = (e: Event) => {
      const scrollTop = (e.target as HTMLDivElement).scrollTop;

      setHeaderBg(() => getHeaderBg(location.pathname, scrollTop));
    };
    wrapper?.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      wrapper?.removeEventListener('scroll', handleScroll);
    };
  }, [scrollTarget]);

  return (
    <Wrapper bgColor={headerBg}>
      <Container>
        <NavButton href="/" aria-label="Go to Landing Page">
          <Logo src={LogoLarge} height="64" />
        </NavButton>
        <NavButton href="/report" aria-label="Go to Report Page">
          <motion.div
            initial={{ clipPath: 'circle(100%)' }}
            animate={{ clipPath: currentPath === 'report' ? 'circle(0%)' : 'circle(100%)' }}
            transition={{ duration: 0.3 }}
          >
            <span>REPORT</span>
          </motion.div>
          <motion.div
            className="selected-logo"
            initial={{ clipPath: 'circle(0%)' }}
            animate={{ clipPath: currentPath === 'report' ? 'circle(100%)' : 'circle(0%)' }}
            transition={{ duration: 0.3 }}
          >
            <img src={LogoSmall} width={100} height={100} alt="Small Logo" />
          </motion.div>
        </NavButton>
        <NavButton href="/schedule" aria-label="Go to Schedule Page">
          <motion.div
            initial={{ clipPath: 'circle(100%)' }}
            animate={{ clipPath: currentPath === 'schedule' ? 'circle(0%)' : 'circle(100%)' }}
            transition={{ duration: 0.3 }}
          >
            <span>SCHEDULE</span>
          </motion.div>
          <motion.div
            className="selected-logo"
            initial={{ clipPath: 'circle(0%)' }}
            animate={{ clipPath: currentPath === 'schedule' ? 'circle(100%)' : 'circle(0%)' }}
            transition={{ duration: 0.3 }}
          >
            <img src={LogoSmall} width={100} height={100} alt="Small Logo" />
          </motion.div>
        </NavButton>

        <NavButton href="/dear" aria-label="Go to Dear Page">
          <motion.div
            initial={{ clipPath: 'circle(100%)' }}
            animate={{ clipPath: currentPath === 'dear' ? 'circle(0%)' : 'circle(100%)' }}
            transition={{ duration: 0.3 }}
          >
            <span>DEAR.</span>
          </motion.div>
          <motion.div
            className="selected-logo"
            initial={{ clipPath: 'circle(0%)' }}
            animate={{ clipPath: currentPath === 'dear' ? 'circle(100%)' : 'circle(0%)' }}
            transition={{ duration: 0.3 }}
          >
            <img src={LogoSmall} width={100} height={100} alt="Small Logo" />
          </motion.div>
        </NavButton>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ bgColor: HeaderBg }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  user-select: none;
  background-color: ${(props) => props.bgColor};
  transition: all 0.5s;
`;

const Container = styled.div`
  width: var(--width);
  margin: auto;
  display: flex;
  align-items: center;
  gap: 64px;
  padding: 32px;
`;

const Logo = styled.img`
  height: 64px;
  cursor: pointer;
  user-select: none;
`;

const NavButton = styled(Link)`
  position: relative;
  font-family: 'PartialSansKR' !important;
  color: var(--color);
  font-size: 32px;
  font-weight: 400;
  line-height: 42px;
  cursor: pointer;
  user-select: none;

  * {
    font-family: inherit !important;
  }

  & > .selected-logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 48px;
    height: 48px;
  }
`;

export default Header;
