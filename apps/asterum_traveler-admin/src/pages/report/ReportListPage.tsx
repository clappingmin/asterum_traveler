import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as api from '../../shared/services/reportService';
import { Product, Report } from '@asterum/types';

function ReportListPage() {
  const [view, setView] = useState<'product' | 'report'>('product');

  // TODO: isLoading으로 로딩 넣기
  // TODO: product, report 컴포넌트 분리하기
  const { data: products } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      return await api.getProducts();
    },
  });

  const { data: reports } = useQuery<Report[]>({
    queryKey: ['reports'],
    queryFn: async () => {
      return await api.getReports();
    },
  });

  return (
    <Wrapper>
      <TopContainer>
        <Tabs>
          <Tab isSelected={view === 'product'} onClick={() => setView('product')}>
            Product
          </Tab>
          <Tab isSelected={view === 'report'} onClick={() => setView('report')}>
            Report
          </Tab>
        </Tabs>
        <ButtonWrapper>
          <EditButton to={'edit/product'}>Add Product</EditButton>
          <EditButton to={'edit/report'}>Add Report</EditButton>
        </ButtonWrapper>
      </TopContainer>
      {view === 'product' ? (
        <ListContainer>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Thumbnail</th>
            </tr>
          </thead>
          <tbody>
            {/* TODO: product가 undefined일 때 api를 고칠지 여기서 이렇게 다룰지 고민 필요 */}
            {products &&
              products.map((product: Product, index) => (
                <tr key={index}>
                  <td>{product.id}</td>
                  <td>{product.productName}</td>
                  <td>{product.productBrand}</td>
                  <td>
                    <img src={product.productThumbnail} />
                  </td>
                </tr>
              ))}
          </tbody>
        </ListContainer>
      ) : (
        <ListContainer>
          <thead>
            <tr>
              <th>ID</th>
              <th>ReportType</th>
              <th>Members</th>
              <th>Thumbnail</th>
            </tr>
          </thead>
          <tbody>
            {reports &&
              reports.map((report: Report, index) => (
                <tr key={index}>
                  <td>{report.id}</td>
                  <td>{report.reportType}</td>
                  <td>{report.reportMembers.join(', ')}</td>
                  <td>
                    <img src={report.reportThumbnail} />
                  </td>
                </tr>
              ))}
          </tbody>
        </ListContainer>
      )}
    </Wrapper>
  );
}
const Wrapper = styled.div``;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Tabs = styled.div`
  display: flex;
  gap: 4px;
`;

interface TabProps {
  isSelected: boolean;
}

const Tab = styled.button<TabProps>`
  padding: 4px 8px;
  border-radius: 4px;
  background: ${(props) => (props.isSelected ? 'var(--main)' : '#29292c')};
  border: none;
  color: ${(props) => (props.isSelected ? 'var(--black)' : '#898989')};
  font-size: 16px;
  font-weight: 450;
  line-height: 140%;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 4px;
`;

const EditButton = styled(Link)`
  padding: 4px 8px;
  border-radius: 4px;
  background: #29292c;
  border: none;
  color: var(--label);
  font-size: 16px;
  font-weight: 450;
  line-height: 140%;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background: var(--main);
    color: var(--black);
  }
`;

const ListContainer = styled.table`
  & > thead {
    color: var(--label);
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 18.651px */
  }

  & > tbody {
    color: #dbdbdb;
    font-size: 16px;
    font-weight: 400;
    line-height: 140%;
  }

  tr {
    border-bottom: 1px solid rgba(137, 137, 137, 0.3);
  }

  th,
  td {
    text-align: start;
    padding: 4px 10px;
    vertical-align: middle;

    &:nth-of-type(2),
    &:nth-of-type(3) {
      min-width: 200px;
    }

    & > img {
      width: 50px;
      height: 50px;
      border-radius: 4px;
    }
  }
`;

export default ReportListPage;
