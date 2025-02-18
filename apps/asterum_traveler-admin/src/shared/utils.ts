import { Timestamp } from 'firebase/firestore';

// date-local string Timestamp로 변경
export const localStringToTimestamp = (localString: string) => {
  const date = new Date(localString);

  return Timestamp.fromDate(date);
};

export const getTimeFromTimestamp = (timestamp: Timestamp): string => {
  const date = timestamp.toDate();

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
};
