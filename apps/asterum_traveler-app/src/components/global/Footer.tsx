import styled from 'styled-components';
import Vlast from '@/assets/images/social/vlast.png';
import X from '@/assets/images/social/x.png';
import Youtube from '@/assets/images/social/youtube.png';
import DaumCafe from '@/assets/images/social/daum_cafe.png';
import Weverse from '@/assets/images/social/weverse.png';
import React from 'react';

function Footer() {
  return (
    <Wrapper>
      <Container>
        <Title>Asterum Traveler</Title>
        <Introduction>
          We are here to inspire each other and share our appreciation and love for Flexibility.
          This page is a home for abstract and beautiful stories, and a space where each person can
          create their own meaning. Every moment with Flexibility gives us greater meaning, and
          their music gives us a special journey.
        </Introduction>
        <HorizontalLine />
        <ContactBox>
          <DeveloperBox>
            <InfoBox>
              <Label>Contact</Label>
              <InfoContent>clappingin@gmail.com</InfoContent>
            </InfoBox>
            <InfoBox>
              <Label>Copyright</Label>
              <InfoContent>Nine Park</InfoContent>
            </InfoBox>
            <InfoBox>
              <Label>Design</Label>
              <InfoContent>Wani Jeong @hebinipierce</InfoContent>
            </InfoBox>
          </DeveloperBox>
          <SocialBox>
            <a href="https://vlast.com/" target="_blank" aria-label="Go to vlast">
              <SocialIcon src={Vlast} height={24} alt="블래스트 공식 홈페이지로 이동하기 아이콘" />
            </a>
            <a
              href="https://x.com/plave_official"
              target="_blank"
              aria-label="Go to Plave official X"
            >
              <SocialIcon src={X} height={24} alt="플레이브 X 공식 페이지로 이동하기 아이콘" />
            </a>
            <a
              href="https://www.youtube.com/@plave_official"
              target="_blank"
              aria-label="Go to Plave official Youtube"
            >
              <SocialIcon
                src={Youtube}
                height={24}
                alt="플레이브 공식 유튜브 채널로 이동하기 아이콘"
              />
            </a>
            <a
              href="https://cafe.daum.net/plave"
              target="_blank"
              aria-label="Go to Plave official Daum Cafe"
            >
              <SocialIcon
                src={DaumCafe}
                height={24}
                alt="플레이브 공식 다음 팬카페로 이동하기 아이콘"
              />
            </a>
            <a href="https://weverse.io/plave" target="_blank" aria-label="Go to Plave Weverse">
              <SocialIcon
                src={Weverse}
                height={24}
                alt="플레이브 공식 위버스 페이지로 이동하기 아이콘"
              />
            </a>
          </SocialBox>
        </ContactBox>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  user-select: none;
`;

const Container = styled.div`
  width: var(--width);
  margin: auto;
  padding: 64px 0;
`;

const Title = styled.div`
  color: var(--color);
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
`;

const Introduction = styled.div`
  margin-top: 16px;
  color: var(--color);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--color);
  margin: 16px 0;
`;

const ContactBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  user-select: text;
`;

const DeveloperBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InfoBox = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const Label = styled.div`
  color: var(--color);
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
`;

const InfoContent = styled.div`
  color: var(--color);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;

const SocialBox = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  user-select: none;
`;

const SocialIcon = styled.img`
  cursor: pointer;
  height: 24px;
`;

export default  React.memo(Footer);
