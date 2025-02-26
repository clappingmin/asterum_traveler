import styled from 'styled-components';
import LogoLarge from '../../assets/images/logos/logo_large.svg';
import { Link, useLocation } from 'react-router-dom';
import LogoSmall from '../../assets/images/logos/logo_small.svg';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function Header() {
  const location = useLocation();

  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    const path = location.pathname.split('/').filter(Boolean)[0] || '';
    setCurrentPath(path);
  }, [location]);

  return (
    <Wrapper>
      <Container>
        <NavButton to="/">
          <Logo src={LogoLarge} height="64" />
        </NavButton>
        <NavButton to="report">
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
        <NavButton to="schedule">
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

        <NavButton to="dear">
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

const Wrapper = styled.div`
  user-select: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  user-select: none;
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
`;

const NavButton = styled(Link)`
  position: relative;
  font-family: 'PartialSansKR' !important;
  color: var(--color);
  font-size: 32px;
  font-weight: 400;
  line-height: 42px;
  cursor: pointer;

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
