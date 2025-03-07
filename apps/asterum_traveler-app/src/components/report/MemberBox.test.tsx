import { render, screen } from '@testing-library/react';
import MemberBox from './MemberBox';
import { MEMBER_ENGLISH_NAME, MEMBER_KOREAN_NAME } from '../../shared/constants';
import { Member } from '@asterum/types';

describe('MemberBox', () => {
  test('멤버의 사진과 한글이름, 영어이름이 보여야 한다', () => {
    const testMember: Member = 'bamby';
    render(<MemberBox member={testMember} />);

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText(MEMBER_KOREAN_NAME[testMember])).toBeInTheDocument();
    expect(screen.getByText(MEMBER_ENGLISH_NAME[testMember])).toBeInTheDocument();
  });
});
