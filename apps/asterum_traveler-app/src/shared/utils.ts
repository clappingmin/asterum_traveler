import { Member, Schedule } from '@asterum/types';
import { createStandaloneToast } from '@chakra-ui/react';
import { Timestamp } from 'firebase/firestore';

export const timestampToDisplayDate = (createdAt: Timestamp): string => {
  const date = createdAt.toDate();
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}.${month}.${day}`;
};

export const sortSchedule = (a: Schedule, b: Schedule) => {
  if (a.isAnniversary && !b.isAnniversary) return -1;
  else if (!a.isAnniversary && b.isAnniversary) return 1;
  else {
    if (a.schedule_hour < b.schedule_hour) return -1;
    else if (a.schedule_hour > b.schedule_hour) return 1;
    else {
      if (a.schedule_minute < b.schedule_minute) return -1;
      else if (a.schedule_minute > b.schedule_minute) return 1;
      else return 0;
    }
  }
};

export const formatTime = (hour: number, minute: number) => {
  const period = hour >= 12 ? 'PM' : 'AM';

  const formattedHour = String(hour > 0 ? hour % 12 : 0);
  const formattedMinute = String(minute).padStart(2, '0'); // 두 자리수로 변환

  return minute === 0
    ? `${formattedHour}${period}`
    : `${formattedHour}:${formattedMinute} ${period}`;
};

export const getWeekDay = (date: Date) => {
  return date.toLocaleString('en-US', { weekday: 'short' });
};

export const sortMembers = (members: Member[]): Member[] => {
  const order = ['yejun', 'noah', 'bamby', 'eunho', 'hamin'];
  const orderMap = new Map(order.map((name, index) => [name, index]));

  return members.sort((a, b) => (orderMap.get(a) ?? Infinity) - (orderMap.get(b) ?? Infinity));
};

export const getRowCountForInfiniteScroll = (): number => {
  const screenArea = window.innerWidth * window.innerHeight;
  const cellArea = Math.pow(window.innerWidth / 4, 2);
  const cellRowCount = Math.ceil(screenArea / cellArea / 4);

  return cellRowCount + 1;
};

export const getListMinHeight = (cellHeight: number = 388): number => {
  const screenArea = window.innerWidth * window.innerHeight;
  const cellArea = Math.pow(window.innerWidth / 4, 2);
  const cellRowCount = Math.ceil(screenArea / cellArea / 4);

  return cellRowCount * cellHeight;
};

const { toast } = createStandaloneToast();

export function showSuccessToast(message: string = '요청이 성공적으로 처리되었습니다.') {
  toast({
    description: message,
    status: 'success',
    duration: 4000,
    isClosable: true,
  });
}

export const sendMessageToSlack = async () => {
  try {
    const functionURL = import.meta.env.VITE_FIREBASE_FUNCTION_SEND_TO_SLACK_URL;

    const response = await fetch(functionURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: '🚀 Firebase Functions 배포 성공!' }),
    });

    // 응답이 JSON 형식인지 확인
    const text = await response.text();
    console.log('응답 데이터:', text);

    try {
      const result = JSON.parse(text);
      console.log('Slack 메시지 전송 결과:', result);
    } catch (error) {
      console.error('JSON 파싱 오류:', error);
    }
  } catch (error) {
    console.error('클라이언트 Slack 메시지 전송 실패:', error);
  }
};
