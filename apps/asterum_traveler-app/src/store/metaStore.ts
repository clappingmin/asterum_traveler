import { create } from 'zustand';
import { MetaTag } from '../shared/interfaces/common.interface';
import metaJson from '../assets/jsons/metaData.json';

interface MetaState extends MetaTag {
  setMetaData: (data: MetaTag) => void;
}

export const useMetaStore = create<MetaState>((set) => ({
  title: metaJson['base'].title,
  description: metaJson['base'].description,
  keyword: metaJson['base'].keyword,
  image: metaJson['base'].image,
  setMetaData: (data) => set(() => ({ ...data })),
}));
