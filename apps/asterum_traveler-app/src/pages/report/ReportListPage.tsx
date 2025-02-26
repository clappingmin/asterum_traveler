import styled from 'styled-components';
import reportYejunImg from '../../assets/images/member/report_yejun.png';
import { useQuery } from '@tanstack/react-query';
import { ReportCategory, Report, ReportType } from '@asterum/types';
import * as api from '../../shared/services/reportService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ReportListPage() {
  const [category, setCategory] = useState<ReportCategory | 'all'>('all');
  const navigate = useNavigate();

  const { data: reports } = useQuery<Report[]>({
    queryKey: ['reports', category],
    queryFn: async () => {
      return await api.getReportsByCategory(category);
    },
  });

  const goToReportDetail = (reportId: string, reportType: ReportType) => {
    navigate(`${reportType}/${reportId}`);
  };

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
      <PostContainer>
        {reports?.map((report) => (
          <Post key={report.id} onClick={() => goToReportDetail(report.id, report.reportType)}>
            <img
              src={report.reportThumbnail}
              width={388}
              height={388}
              alt={'리포트 이미지'}
              loading="lazy"
              decoding="async"
            />
          </Post>
        ))}
      </PostContainer>
      {/* TODO: 무한스크롤 영역 margin 처리 */}
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
  background-color: var(--placeholder);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export default ReportListPage;
