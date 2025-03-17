import { Member } from '@asterum/types';
import { MetaTag } from './interfaces/common.interface';

export const ALL_MEMBERS: Member[] = ['yejun', 'noah', 'bamby', 'eunho', 'hamin'];

export const MEMBER_KOREAN_NAME = {
  yejun: '예준',
  noah: '노아',
  bamby: '밤비',
  eunho: '은호',
  hamin: '하민',
};

export const MEMBER_ENGLISH_NAME = {
  yejun: 'YEJUN',
  noah: 'NOAH',
  bamby: 'BAMBY',
  eunho: 'EUNHO',
  hamin: 'HAMIN',
};

export const MEMBER_HEART = {
  yejun: '💙',
  noah: '💜',
  bamby: '💗',
  eunho: '❤️',
  hamin: '🖤',
};

export const InfiniteQueryEmptyReturn = {
  data: [],
  lastVisible: null,
};

export const baseMeta: MetaTag = {
  title: 'ASTERUM TRAVELER | 플레이브 팬페이지',
  description:
    '플레이브 팬페이지, 아스테룸 트레블러! 플레이브가 착용한 옷, 게임, 라이브 정보를 확인하고, 플리가 직접 응원 메시지를 남길 수 있는 공간! 또한, 플레이브의 스케줄을 한눈에 확인할 수 있는 팬페이지입니다.',
  keyword: [
    '플레이브',
    'PLAVE',
    '플레이브 팬페이지',
    '플리',
    '예준',
    '노아',
    '밤비',
    '은호',
    '하민',
    '플레이브 리포트',
    '플레이브 디어',
    '플레이브 스케줄',
    '플레이브 메시지',
    '플레이브 라이브',
    '플레이브 유튜브',
    '플레이브 라디오',
    '플레이브 의상',
    '플레이브 게임',
    '플레이브 사용 물건',
    '플레이브 굿즈',
    '플레이브 응원',
    '플레이브 스타일',
    '플레이브 음악',
    '플레이브 음원',
    '플레이브 스케줄 확인',
    '플리 커뮤니티',
  ],
  image:
    'https://firebasestorage.googleapis.com/v0/b/asterum-traveler.firebasestorage.app/o/base%2Flogo_large.svg?alt=media&token=41a8fb91-d82a-49a9-8c09-c0313340ffd1',
};
