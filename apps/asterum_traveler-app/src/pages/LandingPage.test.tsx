import { render, screen } from '@testing-library/react';
import LandingPage from '@/pages/LandingPage';

jest.mock('@/components/landing/ImgSlider', () => () => <div data-testid="img-slider" />);
jest.mock('@/components/landing/DearWall', () => () => <div data-testid="dear-wall" />);
jest.mock('@/components/landing/ScheduleBoard', () => () => <div data-testid="schedule-board" />);
jest.mock('@/components/landing/DiscographyBoard', () => () => (
  <div data-testid="discography-board" />
));

describe('LandingPage', () => {
  test('LandingPage 렌더링 테스트', () => {
    render(<LandingPage />);

    expect(screen.getByTestId('img-slider')).toBeInTheDocument();
    expect(screen.getByTestId('dear-wall')).toBeInTheDocument();
    expect(screen.getByTestId('schedule-board')).toBeInTheDocument();
    expect(screen.getByTestId('discography-board')).toBeInTheDocument();
  });
});
