import { Timestamp } from 'firebase/firestore';

export type CardCoverColor =
  | 'pink'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'skyblue'
  | 'blue'
  | 'yellowgreen';

export interface DearCardBase {
  from: string;
  password: string;
  content: string;
  cardCoverColor: CardCoverColor;
}

export interface DearCard extends DearCardBase {
  id: string;
  createdAt: Timestamp;
}
