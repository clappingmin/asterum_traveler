import styled from 'styled-components';
import reportYejunImg from '@/assets/images/member/report_yejun.png';
import { ReportCategory } from '@asterum/types';
import { useState } from 'react';
import FetchErrorBoundary from '@/components/global/error/FetchErrorBoundary';
import ReportListView from '@/components/report/ReportListView';

function Page() {
  const [category, setCategory] = useState<ReportCategory | 'all'>('all');
  const [refetchFn, setRefetchFn] = useState<(() => Promise<unknown>) | null>(null);

  const categories: { label: string; value: ReportCategory | 'all' }[] = [
    { label: 'All', value: 'all' },
    { label: 'Album', value: 'album' },
    { label: 'Fashion', value: 'fashion' },
    { label: 'Game', value: 'game' },
    { label: 'Live', value: 'live' },
    { label: 'etc.', value: 'etc' },
  ];

  return (
    <Wrapper>
      <TitleContainer>
        <Title>REPORT</Title>
        <Yejun
          width={863}
          height={543}
          src={reportYejunImg}
          alt="ASTERUM TRAVELER Report 페이지 예준 이미지"
        />
      </TitleContainer>
      <TabContainer>
        <Tabs>
          {categories.map(({ label, value }) => (
            <Tab key={value} isSelected={category === value} onClick={() => setCategory(value)}>
              {label}
            </Tab>
          ))}
        </Tabs>
        <HorizontalLine />
      </TabContainer>
      <FetchErrorBoundary onRetry={() => refetchFn?.()}>
        <ReportListView category={category} onRefetch={setRefetchFn} />
      </FetchErrorBoundary>
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

const Tab = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<TabProps>`
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

export { Page };
