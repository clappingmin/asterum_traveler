import styled from 'styled-components';
import reportYejunImg from '../../assets/images/member/report_yejun.png';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ReportCategory, Report } from '@asterum/types';
import * as api from '../../shared/services/reportService';
import { useState } from 'react';
import PostBox from '../../components/report/PostBox';
import InfiniteScroll from '../../components/global/InfiniteScroll';
import { getListMinHeight } from '../../shared/utils';

function ReportListPage() {
  const [category, setCategory] = useState<ReportCategory | 'all'>('all');
  const [postListHeight, _setPostListHeight] = useState<number>(getListMinHeight());

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['reports', category],
    queryFn: api.getReportsByCategory,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.lastPage || undefined,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <Wrapper>
      <TitleContainer>
        <Title>REPORT</Title>
        <Yejun width={863} height={543} src={reportYejunImg} />
      </TitleContainer>
      <TabContainer>
        <Tabs>
          <Tab
            isSelected={category === 'all'}
            onClick={() => {
              setCategory('all');
            }}
          >
            All
          </Tab>
          <Tab
            isSelected={category === 'album'}
            onClick={() => {
              setCategory('album');
            }}
          >
            Album
          </Tab>
          <Tab
            isSelected={category === 'fashion'}
            onClick={() => {
              setCategory('fashion');
            }}
          >
            Fashion
          </Tab>
          <Tab
            isSelected={category === 'game'}
            onClick={() => {
              setCategory('game');
            }}
          >
            Game
          </Tab>
          <Tab
            isSelected={category === 'live'}
            onClick={() => {
              setCategory('live');
            }}
          >
            Live
          </Tab>
          <Tab
            isSelected={category === 'etc'}
            onClick={() => {
              setCategory('etc');
            }}
          >
            etc.
          </Tab>
        </Tabs>
        <HorizontalLine />
      </TabContainer>
      <PostContainer minHeight={postListHeight}>
        {data?.pages
          .flatMap((page) => page.data)
          .map((report: Report) => (
            <PostBox key={report.id} report={report} />
          ))}
      </PostContainer>

      <InfiniteScroll
        fetchFn={fetchNextPage}
        isLoaded={isFetchingNextPage}
        isLastPage={!!!hasNextPage}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  margin: var(--header-height) auto 0;

  * {
    user-select: none;
  }
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

interface TabProps {
  isSelected: boolean;
}

const Tab = styled.div<TabProps>`
  color: ${(props) => (props.isSelected ? 'var(--report)' : 'var(--gray)')};
  font-size: 32px;
  font-weight: ${(props) => (props.isSelected ? 700 : 400)};
  line-height: 48px;
  cursor: pointer;
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

const PostContainer = styled.div<{ minHeight: number }>`
  width: var(--width);
  margin: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  min-height: ${(props) => `${props.minHeight}px`};
`;

export default ReportListPage;
