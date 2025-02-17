import { Timestamp } from 'firebase/firestore';

// date-local string Timestamp로 변경
export const localStringToTimestamp = (localString: string) => {
  const date = new Date(localString);

  return Timestamp.fromDate(date);
};
