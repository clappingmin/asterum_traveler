export interface SliderImage {
  id: string;
  order: number; // 초기값: -1
  imageUrl: string;
}

export interface Album {
  id: string;
  imageUrl: string;
  albumName: string;
  releaseDate: string; // 'YYYY.MM.DD'
}
