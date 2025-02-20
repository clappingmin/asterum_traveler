import styled from 'styled-components';

function DiscographyOverView() {
  return (
    <Wrapper>
      <DiscographyBox>
        <img src="https://i.namu.wiki/i/aHgckCf0RiUZ1gfaXDkrEMsY-IpdybKOItj7Ve1gYrLyHNPCtKpFL9sF-joh_Kvoj3te6OAtZy_E0ssyWd86Ko4fgK1T67cDxxP-s6TczFpkhtYQV-NZ-ljAKXoPIDzGHqzRmN0haX1mwhF44nzbLQ.webp" />
        <span>ASTERUM : The Shape of Things to Come</span>
        <span>2023.08.24</span>
      </DiscographyBox>
      <DiscographyBox>
        <img src="https://i.namu.wiki/i/aHgckCf0RiUZ1gfaXDkrEMsY-IpdybKOItj7Ve1gYrLyHNPCtKpFL9sF-joh_Kvoj3te6OAtZy_E0ssyWd86Ko4fgK1T67cDxxP-s6TczFpkhtYQV-NZ-ljAKXoPIDzGHqzRmN0haX1mwhF44nzbLQ.webp" />
        <span>ASTERUM : The Shape of Things to Come</span>
        <span>2023.08.24</span>
      </DiscographyBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
`;

const DiscographyBox = styled.div`
  background-color: #29292c;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 200px;

  & > img {
  }

  & > span:nth-of-type(1) {
    font-size: 20px;
    font-weight: 500;
  }

  & > span:last-of-type {
    font-size: 14px;
  }
`;

export default DiscographyOverView;
