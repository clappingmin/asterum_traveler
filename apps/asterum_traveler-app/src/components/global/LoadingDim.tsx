import { motion } from 'framer-motion';
import styled from 'styled-components';
import logoIcon from '@/assets/images/logos/logo_small.svg';

function LoadingDim() {
  return (
    <Wrapper>
      <LoadingIcon
        src={logoIcon}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1 }}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingIcon = styled(motion.img)`
  width: 60px;
  height: 60px;
`;

export default LoadingDim;
