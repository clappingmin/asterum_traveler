import { describe, expect, test } from '@jest/globals';
import { Timestamp } from 'firebase/firestore';
import {
  formatTime,
  getListMinHeight,
  getRowCountForInfiniteScroll,
  getWeekDay,
  sortMembers,
  timestampToDisplayDate,
} from './utils';
import { Member } from '@asterum/types';

describe('유틸 함수 테스트', () => {
  describe('timestampToDisplayDate()', () => {
    test('Firebase Timestamp를 올바르게 포맷해야 한다', () => {
      const mockTimestamp = Timestamp.fromDate(new Date('1997-09-19T12:00:00Z'));
      expect(timestampToDisplayDate(mockTimestamp)).toBe('1997.09.19');
    });

    test('포맷한 결과가 정규식을 통과해야 한다', () => {
      const testTimestamp = Timestamp.now();

      expect(timestampToDisplayDate(testTimestamp)).toMatch(/^\d{4}\.\d{2}\.\d{2}$/);
    });
  });

  describe('formatTime()', () => {
    test('정각 아닌 시간을 올바르게 포맷해야 한다', () => {
      expect(formatTime(2, 12)).toBe('2:12 AM');
    });

    test('정각 시간을 올바르게 포맷해야 한다', () => {
      expect(formatTime(16, 0)).toBe('4PM');
    });
  });

  describe('getWeekDay()', () => {
    test('요일을 가져와야 한다', () => {
      const testDate = new Date(1997, 8, 19, 0, 0);
      expect(getWeekDay(testDate)).toBe('Fri');
    });
  });

  describe('sortMembers()', () => {
    test('멤버들을 순서에 맞게 정렬해야 한다.', () => {
      const mockMembers: Member[] = ['noah', 'bamby', 'yejun', 'hamin', 'eunho'];

      expect(sortMembers(mockMembers)).toStrictEqual(['yejun', 'noah', 'bamby', 'eunho', 'hamin']);
    });
  });

  describe('getRowCountForInfiniteScroll()', () => {
    const calculateExpectedRowCount = (width: number, height: number): number => {
      const screenArea = width * height;
      const cellArea = Math.pow(width / 4, 2);
      return Math.ceil(screenArea / cellArea / 4) + 1;
    };

    beforeEach(() => {
      Object.defineProperty(window, 'innerWidth', { writable: true, value: 1024 });
      Object.defineProperty(window, 'innerHeight', { writable: true, value: 768 });
    });

    test('기본 해상도 (1024x768)에서 올바른 행 개수를 반환', () => {
      expect(getRowCountForInfiniteScroll()).toBe(calculateExpectedRowCount(1024, 768));
    });

    test('1920x1080 해상도에서 올바른 행 개수를 반환', () => {
      window.innerWidth = 1920;
      window.innerHeight = 1080;
      expect(getRowCountForInfiniteScroll()).toBe(calculateExpectedRowCount(1920, 1080));
    });

    test('모바일 해상도 (375x812)에서 올바른 행 개수를 반환', () => {
      window.innerWidth = 375;
      window.innerHeight = 812;
      expect(getRowCountForInfiniteScroll()).toBe(calculateExpectedRowCount(375, 812));
    });
  });

  describe('getListMinHeight()', () => {
    const calculateListMinHeight = (cellHeight: number): number => {
      const screenArea = window.innerWidth * window.innerHeight;
      const cellArea = Math.pow(window.innerWidth / 4, 2);
      const cellRowCount = Math.ceil(screenArea / cellArea / 4);

      return cellRowCount * cellHeight;
    };

    beforeEach(() => {
      Object.defineProperty(window, 'innerWidth', { writable: true, value: 1024 });
      Object.defineProperty(window, 'innerHeight', { writable: true, value: 768 });
    });

    test('기본 해상도 (1024x768)에서 셀 행 개수를 반환', () => {
      expect(getListMinHeight()).toBe(calculateListMinHeight(388));
    });

    test('1920x1080 해상도에서 올바른 셀 개수를 반환', () => {
      window.innerWidth = 1920;
      window.innerHeight = 1080;
      expect(getListMinHeight()).toBe(calculateListMinHeight(388));
    });

    test('모바일 해상도 (375x812)에서 올바른 셀 개수를 반환', () => {
      window.innerWidth = 375;
      window.innerHeight = 812;
      expect(getListMinHeight(500)).toBe(calculateListMinHeight(500));
    });
  });
});
