export type CardCoverColor =
  | 'pink'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'skyblue'
  | 'blue'
  | 'yellowgreen';

export interface DearCard {
  from: string;
  password: string;
  writeDate: string;
  content: string;
  cardCoverColor: CardCoverColor;
}
