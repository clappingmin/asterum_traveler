import styled from 'styled-components';
import reportYejunImg from '../assets/images/member/report_yejun.png';

function ReportListPage() {
  return (
    <Wrapper>
      <TitleContainer>
        <Title>REPORT</Title>
        <Yejun width={863} height={543} src={reportYejunImg} />
      </TitleContainer>
      <TabContainer>
        <Tabs>
          <Tab>All</Tab>
          <Tab>Album</Tab>
          <Tab>Fashion</Tab>
          <Tab>Game</Tab>
          <Tab>Live</Tab>
          <Tab>Product</Tab>
        </Tabs>
        <HorizontalLine />
      </TabContainer>
      <PostContainer>
        <Post /> <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </PostContainer>
      {/* TODO: 무한스크롤 영역 margin 처리 */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  margin: var(--header-height) auto 0;
`;

const TitleContainer = styled.div`
  position: relative;
  margin: auto;
  width: var(--width);
  padding-top: 64px;
`;

const Title = styled.div`
  color: var(--report);
  font-family: 'PartialSansKR' !important;
  font-size: 200px;
  font-weight: 400;
  line-height: 120%;
`;

const Yejun = styled.img`
  position: absolute;
  bottom: -127px;
  left: 897px;
  width: 863px;
  height: 543px;
`;

const TabContainer = styled.div`
  position: relative;
  margin: 64px 0 16px;
  width: 100%;
`;

const Tabs = styled.div`
  margin: 0 auto;
  padding-bottom: 16px;
  width: var(--width);
  display: flex;
  align-items: center;
  gap: 32px;
`;

const Tab = styled.div`
  color: #7f8082;
  font-size: 32px;
  font-weight: 400;
  line-height: 48px;
`;

const HorizontalLine = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 0;
  border: 1px solid #fff;
`;

const PostContainer = styled.div`
  width: var(--width);
  margin: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`;

const Post = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background-color: pink;
`;

export default ReportListPage;
